import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useAuthStore } from "@/store/authStore"

export default function RegistroFamilia() {
  const navigate = useNavigate()
  const { registrarFamilia, cargando } = useAuthStore()

  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
    aceptaTerminos: false,
  })

  const [error, setError] = useState("")

  const handleChange = (campo: string, valor: string | boolean) => {
    setFormulario({ ...formulario, [campo]: valor })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formulario.password !== formulario.confirmarPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formulario.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (!formulario.aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    const { error } = await registrarFamilia({
      nombre: formulario.nombre,
      email: formulario.email,
      password: formulario.password,
    })

    if (error) {
      setError(error)
      return
    }

    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-verde-suave to-white py-12 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-verde-principal to-verde-oscuro p-3 rounded-xl">
              <LogoFamilia variante="header" />
            </div>
            <h1 className="text-3xl font-bold text-verde-oscuro">ConciliaEx</h1>
          </Link>

          <h2 className="text-3xl font-bold text-verde-oscuro mb-2">
            Crea tu cuenta de Familia
          </h2>
          <p className="text-muted-foreground">
            Accede a servicios y recursos adaptados para tu familiar
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="María García López"
                value={formulario.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formulario.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={formulario.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Mostrar contraseña"
                >
                  {mostrarPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmar">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmar"
                  type={mostrarConfirmar ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={formulario.confirmarPassword}
                  onChange={(e) => handleChange("confirmarPassword", e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Mostrar contraseña"
                >
                  {mostrarConfirmar ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="terminos"
                checked={formulario.aceptaTerminos}
                onCheckedChange={(checked) => handleChange("aceptaTerminos", checked === true)}
              />
              <Label htmlFor="terminos" className="text-sm font-normal cursor-pointer leading-relaxed">
                Acepto los{" "}
                <a href="#" className="text-verde-principal hover:text-verde-oscuro font-semibold hover:underline">
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-verde-principal hover:text-verde-oscuro font-semibold hover:underline">
                  política de privacidad
                </a>
              </Label>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={cargando}
              className="w-full bg-verde-principal hover:bg-verde-oscuro text-white py-6 text-base font-bold disabled:opacity-60"
            >
              {cargando ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <div className="flex items-center justify-between text-sm pt-2">
              <button
                type="button"
                onClick={() => navigate("/registro")}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Volver
              </button>

              <span className="text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-verde-principal hover:text-verde-oscuro font-semibold hover:underline">
                  Inicia sesión
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}