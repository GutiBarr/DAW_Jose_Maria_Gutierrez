import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { usePerfilStore } from "@/store/perfilStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useThemeStore } from "@/store/themeStore"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"
import { supabase } from "@/database/supabase/Client"
import { inputClass } from "@/lib/styles"

export default function Perfil() {
  const { usuario } = useAuthStore()
  const { perfil, cargando, cargarPerfil, actualizarPerfil, subirAvatar } = usePerfilStore()
  const { theme, toggleTheme } = useThemeStore()
  const { lang, toggleLang } = useLangStore()
  const t = useT()

  const [form, setForm] = useState({
    nombre:         "",
    nombre_entidad: "",
    telefono:       "",
    direccion:      "",
  })
  const [avatar, setAvatar]             = useState<File | null>(null)
  const [prevAvatar, setPrevAvatar]     = useState<string>("")
  const [guardando, setGuardando]       = useState(false)
  const [exito, setExito]               = useState(false)
  const [error, setError]               = useState("")

  // Cambio de contraseña
  const [passForm, setPassForm]         = useState({ nueva: "", confirmar: "" })
  const [showNueva, setShowNueva]       = useState(false)
  const [showConfirmar, setShowConfirmar] = useState(false)
  const [guardandoPass, setGuardandoPass] = useState(false)
  const [exitoPass, setExitoPass]       = useState(false)
  const [errorPass, setErrorPass]       = useState("")

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

  const handleSubmit = async () => {
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

  const handleCambiarPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorPass("")
    setExitoPass(false)
    if (passForm.nueva.length < 6) {
      setErrorPass(t.registroFamilia.errPassCorta)
      return
    }
    if (passForm.nueva !== passForm.confirmar) {
      setErrorPass(t.registroFamilia.errPassNoCoinciden)
      return
    }
    setGuardandoPass(true)
    const { error } = await supabase.auth.updateUser({ password: passForm.nueva })
    setGuardandoPass(false)
    if (error) {
      setErrorPass(t.nuevaPassword.errorActualizar)
      return
    }
    setExitoPass(true)
    setPassForm({ nueva: "", confirmar: "" })
  }

  const dashboardUrl = usuario ? getDashboardByRol(usuario.rol) : "/"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoFamilia variante="header" />
          <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button
            onClick={toggleLang}
            className="px-2 py-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <Link
            to={dashboardUrl}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {t.nav.miPanel}
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">{t.perfil.titulo}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.perfil.subtitulo}</p>
        </div>

        {cargando ? (
          <div className="text-center py-16">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">...</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Avatar */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4">{t.perfil.fotoPerfilTitulo}</h2>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted shrink-0 flex items-center justify-center">
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
                    className="text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-emerald-500/10 file:text-emerald-500 hover:file:bg-emerald-500/20 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground/60 mt-1.5">{t.perfil.avatarFormato}</p>
                </div>
              </div>
            </div>

            {/* Datos */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-foreground">{t.perfil.informacion}</h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t.perfil.email}</label>
                <input
                  type="email" value={perfil?.email ?? ""} disabled
                  className="w-full h-9 px-3 rounded-lg border border-border bg-muted text-sm text-muted-foreground cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground/60">{t.perfil.emailInfo}</p>
              </div>

              {usuario?.rol === "entidad" ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t.perfil.nombreEntidad}</label>
                  <input
                    type="text"
                    value={form.nombre_entidad}
                    onChange={(e) => setField("nombre_entidad", e.target.value)}
                    className={inputClass}
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t.perfil.nombre}</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setField("nombre", e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t.perfil.telefono}</label>
                <input
                  type="tel" placeholder="924 000 000"
                  value={form.telefono}
                  onChange={(e) => setField("telefono", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t.perfil.direccion}</label>
                <input
                  type="text"
                  value={form.direccion}
                  onChange={(e) => setField("direccion", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Rol */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">{t.perfil.tipoCuenta}</h2>
              <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${
                usuario?.rol === "admin"
                  ? "bg-violet-500/10 text-violet-500 border-violet-500/20"
                  : usuario?.rol === "entidad"
                  ? "bg-muted text-muted-foreground border-border"
                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              }`}>
                {usuario?.rol === "admin"
                  ? t.perfil.rolAdmin
                  : usuario?.rol === "entidad"
                  ? t.perfil.rolEntidad
                  : t.perfil.rolFamilia}
              </span>
            </div>

            {/* Contraseña */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                {t.perfil.cambiarPassword}
              </h2>
              <form onSubmit={handleCambiarPassword} className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t.perfil.passwordNueva}</label>
                  <div className="relative">
                    <input
                      type={showNueva ? "text" : "password"}
                      placeholder="••••••"
                      value={passForm.nueva}
                      onChange={(e) => { setPassForm({ ...passForm, nueva: e.target.value }); setErrorPass(""); setExitoPass(false) }}
                      className={inputClass + " pr-16"}
                    />
                    <button type="button" onClick={() => setShowNueva(!showNueva)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {showNueva ? t.perfil.ocultar : t.perfil.ver}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t.perfil.passwordConfirmar}</label>
                  <div className="relative">
                    <input
                      type={showConfirmar ? "text" : "password"}
                      placeholder="••••••"
                      value={passForm.confirmar}
                      onChange={(e) => { setPassForm({ ...passForm, confirmar: e.target.value }); setErrorPass(""); setExitoPass(false) }}
                      className={inputClass + " pr-16"}
                    />
                    <button type="button" onClick={() => setShowConfirmar(!showConfirmar)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {showConfirmar ? t.perfil.ocultar : t.perfil.ver}
                    </button>
                  </div>
                </div>
                {errorPass && (
                  <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{errorPass}</p>
                )}
                {exitoPass && (
                  <p className="text-xs text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                    ✓ {t.perfil.passwordActualizada}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit" disabled={guardandoPass || !passForm.nueva || !passForm.confirmar}
                    className="px-5 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-sm font-medium transition-colors disabled:opacity-50 border border-border"
                  >
                    {guardandoPass ? t.perfil.cambiando : t.perfil.cambiarPassword}
                  </button>
                </div>
              </form>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            {exito && (
              <p className="text-xs text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                ✓ {t.perfil.perfilActualizado}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button" onClick={handleSubmit} disabled={guardando}
                className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {guardando ? t.perfil.guardando : t.perfil.guardar}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}