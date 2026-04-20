import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useState } from "react"

export default function Login() {
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [tipoUsuario, setTipoUsuario] = useState("familia")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", { tipoUsuario })
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado izquierdo - Información */}
      <aside className="lg:flex-1 bg-gradient-to-br from-verde-principal to-verde-oscuro text-white p-12 flex items-center justify-center relative overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full" />

        <div className="max-w-md relative z-10">
          <Link to="/" className="flex items-center gap-4 mb-12">
            <LogoFamilia variante="auth" />
            <h1 className="text-4xl font-bold">ConciliaEx</h1>
          </Link>

          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Bienvenido de nuevo
          </h2>
          <p className="text-lg text-white/90 mb-12">
            Accede a tu cuenta para continuar gestionando los servicios y recursos para tu familia.
          </p>

          <ul className="space-y-6 hidden lg:block">
            <li className="flex items-center gap-4 text-lg">
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">✓</span>
              Acceso a todos tus perfiles
            </li>
            <li className="flex items-center gap-4 text-lg">
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">✓</span>
              Servicios guardados y favoritos
            </li>
            <li className="flex items-center gap-4 text-lg">
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">✓</span>
              Búsquedas personalizadas
            </li>
          </ul>
        </div>
      </aside>

      {/* Lado derecho - Formulario */}
      <main className="lg:flex-1 bg-white p-8 lg:p-12 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-verde-oscuro mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          {/* Selector tipo usuario */}
          <Tabs value={tipoUsuario} onValueChange={setTipoUsuario} className="mb-6">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted">
              <TabsTrigger value="familia" className="py-3">Familia</TabsTrigger>
              <TabsTrigger value="entidad" className="py-3">Entidad</TabsTrigger>
              <TabsTrigger value="admin" className="py-3">Admin</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="recordar" />
                <Label htmlFor="recordar" className="text-sm font-normal cursor-pointer">
                  Recordarme
                </Label>
              </div>
              <Link
                to="/recuperar-password"
                className="text-sm text-verde-principal hover:text-verde-oscuro font-semibold hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-verde-principal hover:bg-verde-oscuro text-white py-6 text-base font-bold"
            >
              Iniciar Sesión
            </Button>

            {/* Divisor */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-border" />
              <span className="text-sm text-muted-foreground">o continúa con</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full py-6 font-semibold"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" className="mr-2">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.582c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.582 9 3.582z"/>
              </svg>
              Google
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-verde-principal hover:text-verde-oscuro font-semibold hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}