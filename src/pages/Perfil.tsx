import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { usePerfilStore } from "@/store/perfilStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"
import LogoFamilia from "@/components/layout/LogoFamilia"

export default function Perfil() {
  const { usuario } = useAuthStore()
  const { perfil, cargando, cargarPerfil, actualizarPerfil, subirAvatar } = usePerfilStore()

  const [form, setForm] = useState({
    nombre:         "",
    nombre_entidad: "",
    telefono:       "",
    direccion:      "",
  })
  const [avatar, setAvatar]         = useState<File | null>(null)
  const [prevAvatar, setPrevAvatar] = useState<string>("")
  const [guardando, setGuardando]   = useState(false)
  const [exito, setExito]           = useState(false)
  const [error, setError]           = useState("")

  useEffect(() => {
    cargarPerfil()
  }, [cargarPerfil])

  useEffect(() => {
    if (perfil) {
      setForm({
        nombre:         perfil.nombre         ?? "",
        nombre_entidad: perfil.nombre_entidad ?? "",
        telefono:       perfil.telefono       ?? "",
        direccion:      perfil.direccion      ?? "",
      })
    }
  }, [perfil])

  const setField = (k: string, v: string) => {
    setForm({ ...form, [k]: v })
    setExito(false)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGuardando(true)
    setError("")
    setExito(false)

    let avatar_url = perfil?.avatar_url

    if (avatar && usuario?.id) {
      const { url, error } = await subirAvatar(avatar, usuario.id)
      if (error) { setError(error); setGuardando(false); return }
      avatar_url = url
    }

    const datos: Record<string, string | undefined> = {
      telefono:  form.telefono  || undefined,
      direccion: form.direccion || undefined,
      avatar_url,
    }

    if (usuario?.rol === "entidad") {
      datos.nombre_entidad = form.nombre_entidad || undefined
    } else {
      datos.nombre = form.nombre || undefined
    }

    const { error } = await actualizarPerfil(datos)
    setGuardando(false)
    if (error) { setError(error); return }
    setExito(true)
    setAvatar(null)
  }

  const dashboardUrl = usuario ? getDashboardByRol(usuario.rol) : "/"

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoFamilia variante="header" />
          <span className="text-sm font-semibold text-white">ConciliaEx</span>
        </Link>
        <Link
          to={dashboardUrl}
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Volver al panel
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Mi perfil</h1>
          <p className="text-sm text-slate-500 mt-1">
            Actualiza tu información personal y foto de perfil
          </p>
        </div>

        {cargando ? (
          <div className="text-center py-16">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-600">Cargando perfil...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4">Foto de perfil</h2>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 shrink-0 flex items-center justify-center">
                  {prevAvatar || perfil?.avatar_url ? (
                    <img
                      src={prevAvatar || perfil?.avatar_url}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">
                      {usuario?.rol === "entidad" ? "🏢" : "👤"}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="file" accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setAvatar(file)
                      setPrevAvatar(URL.createObjectURL(file))
                    }}
                    className="text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                  />
                  <p className="text-xs text-slate-600 mt-1.5">JPG, PNG o WEBP. Máximo 5MB.</p>
                </div>
              </div>
            </div>

            {/* Datos */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-white">Información</h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Correo electrónico</label>
                <input
                  type="email" value={perfil?.email ?? ""} disabled
                  className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800/50 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              {usuario?.rol === "entidad" ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500">Nombre de la entidad</label>
                  <input
                    type="text" placeholder="Nombre de tu entidad"
                    value={form.nombre_entidad}
                    onChange={(e) => setField("nombre_entidad", e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500">Nombre completo</label>
                  <input
                    type="text" placeholder="Tu nombre completo"
                    value={form.nombre}
                    onChange={(e) => setField("nombre", e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Teléfono</label>
                <input
                  type="tel" placeholder="924 000 000"
                  value={form.telefono}
                  onChange={(e) => setField("telefono", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Dirección</label>
                <input
                  type="text" placeholder="Calle, ciudad, provincia"
                  value={form.direccion}
                  onChange={(e) => setField("direccion", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Rol */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-white mb-3">Tipo de cuenta</h2>
              <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${
                usuario?.rol === "admin"
                  ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                  : usuario?.rol === "entidad"
                  ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              }`}>
                {usuario?.rol === "admin" ? "Administrador" : usuario?.rol === "entidad" ? "Entidad" : "Familia"}
              </span>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            {exito && (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                ✓ Perfil actualizado correctamente
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit" disabled={guardando}
                className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}