import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useThemeStore } from "@/store/themeStore"

// Guards
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import RoleRoute      from "@/components/auth/RoleRoute"
import AuthGuard      from "@/components/auth/AuthGuard"

// Páginas públicas
import Landing  from "@/pages/Landing"
import NotFound from "@/pages/NotFound"

// Auth pages
import Login             from "@/pages/Login"
import Registro          from "@/pages/Registro"
import RegistroFamilia   from "@/pages/RegistroFamilia"
import RegistroEntidad   from "@/pages/RegistroEntidad"
import RecuperarPassword from "@/pages/RecuperarPassword"
import NuevaPassword     from "@/pages/NuevaPassword"

// Dashboards
import DashboardFamilia   from "@/pages/familia/DashboardFamilia"
import SolicitarServicio  from "@/pages/familia/SolicitarServicio"
import DashboardEntidad   from "@/pages/entidad/DashboardEntidad"
import DashboardAdmin     from "@/pages/admin/DashboardAdmin"

// Perfil
import Perfil from "@/pages/Perfil"

export default function App() {
  const { inicializar } = useAuthStore()
  const { aplicar } = useThemeStore()

  useEffect(() => {
    inicializar()
    aplicar()
  }, [inicializar, aplicar])

  return (
    <BrowserRouter>
      <Routes>

        {/* Pública */}
        <Route path="/" element={<Landing />} />

        {/* Recuperación de contraseña — siempre accesibles */}
        <Route path="/recuperar"      element={<RecuperarPassword />} />
        <Route path="/nueva-password" element={<NuevaPassword />} />

        {/* Solo para NO logueados */}
        <Route element={<AuthGuard />}>
          <Route path="/login"            element={<Login />} />
          <Route path="/registro"         element={<Registro />} />
          <Route path="/registro/familia" element={<RegistroFamilia />} />
          <Route path="/registro/entidad" element={<RegistroEntidad />} />
        </Route>

        {/* Requiere sesión */}
        <Route element={<ProtectedRoute />}>

          <Route element={<RoleRoute roles={["familia"]} />}>
            <Route path="/familia/dashboard" element={<DashboardFamilia />} />
            <Route path="/solicitar/:id"     element={<SolicitarServicio />} />
          </Route>

          <Route element={<RoleRoute roles={["entidad"]} />}>
            <Route path="/entidad/dashboard" element={<DashboardEntidad />} />
          </Route>

          <Route element={<RoleRoute roles={["admin"]} />}>
            <Route path="/admin" element={<DashboardAdmin />} />
          </Route>

          {/* Perfil para todos los roles */}
          <Route path="/perfil" element={<Perfil />} />

        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}