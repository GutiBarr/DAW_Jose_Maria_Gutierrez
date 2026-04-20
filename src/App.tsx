import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import Registro from "@/pages/Registro"
import RegistroFamilia from "@/pages/RegistroFamilia"
import RegistroEntidad from "@/pages/RegistroEntidad"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro/familia" element={<RegistroFamilia />} />
        <Route path="/registro/entidad" element={<RegistroEntidad />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
