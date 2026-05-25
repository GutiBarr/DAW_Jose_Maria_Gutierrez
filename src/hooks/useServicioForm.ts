import { useState } from "react"
import imageCompression from "browser-image-compression"
import { useAuthStore } from "@/store/authStore"
import { useServicioStore } from "@/store/servicioStore"
import { useLangStore } from "@/store/langStore"
import { esTelefonoValido } from "@/lib/validaciones"
import type { Servicio, DatosCrearServicio } from "@/interfaces/Servicio"

const COMPRESSION_OPTIONS = {
  maxSizeMB:        1,
  maxWidthOrHeight: 1920,
  useWebWorker:     true,
}

const FORM_VACIO: DatosCrearServicio = {
  nombre: "", descripcion: "", tipo: "Centro de Día",
  ubicacion: "", telefono: "", imagen_url: "", plazas: null,
}

export function useServicioForm() {
  const { usuario }                                           = useAuthStore()
  const { crearServicio, actualizarServicio, subirImagen, cargarMisServicios } = useServicioStore()
  const { lang }                                             = useLangStore()

  const [mostrarForm, setMostrarForm]                     = useState(false)
  const [form, setForm]                                   = useState<DatosCrearServicio>(FORM_VACIO)
  const [archivoImagen, setArchivoImagen]                 = useState<File | null>(null)
  const [previstaImagen, setPrevistaImagen]               = useState("")
  const [errorForm, setErrorForm]                         = useState("")
  const [guardando, setGuardando]                         = useState(false)
  const [confirmEliminar, setConfirmEliminar]             = useState<string | null>(null)
  const [editandoServicio, setEditandoServicio]           = useState<Servicio | null>(null)
  const [formEditar, setFormEditar]                       = useState<DatosCrearServicio>(FORM_VACIO)
  const [archivoImagenEditar, setArchivoImagenEditar]     = useState<File | null>(null)
  const [previstaImagenEditar, setPrevistaImagenEditar]   = useState("")
  const [errorEditar, setErrorEditar]                     = useState("")
  const [guardandoEdicion, setGuardandoEdicion]           = useState(false)

  const setField = (k: keyof DatosCrearServicio, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }))
    setErrorForm("")
  }

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.descripcion || !form.ubicacion || !form.telefono) {
      setErrorForm(lang === "es" ? "Rellena todos los campos obligatorios" : "Fill in all required fields")
      return
    }
    if (!esTelefonoValido(form.telefono)) {
      setErrorForm(lang === "es"
        ? "El teléfono no es válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9"
        : "Invalid phone number. Must be 9 digits starting with 6, 7, 8 or 9")
      return
    }
    setGuardando(true)
    let imagen_url = form.imagen_url
    if (archivoImagen && usuario?.id) {
      const archivoFinal = archivoImagen.size > 1_048_576
        ? await imageCompression(archivoImagen, COMPRESSION_OPTIONS)
        : archivoImagen
      const { url, error } = await subirImagen(archivoFinal, usuario.id)
      if (error) { setErrorForm(error); setGuardando(false); return }
      imagen_url = url
    }
    const { error } = await crearServicio({ ...form, imagen_url })
    setGuardando(false)
    if (error) { setErrorForm(error); return }
    setForm(FORM_VACIO)
    setArchivoImagen(null)
    setPrevistaImagen("")
    setMostrarForm(false)
  }

  const handleAbrirEditar = (s: Servicio) => {
    setEditandoServicio(s)
    setFormEditar({
      nombre:      s.nombre,
      descripcion: s.descripcion,
      tipo:        s.tipo,
      ubicacion:   s.ubicacion,
      telefono:    s.telefono,
      imagen_url:  s.imagen_url ?? "",
      plazas:      s.plazas,
    })
    setArchivoImagenEditar(null)
    setPrevistaImagenEditar(s.imagen_url ?? "")
    setErrorEditar("")
  }

  const handleGuardarEdicion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editandoServicio) return
    if (!esTelefonoValido(formEditar.telefono)) {
      setErrorEditar(lang === "es"
        ? "El teléfono no es válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9"
        : "Invalid phone number. Must be 9 digits starting with 6, 7, 8 or 9")
      return
    }
    setGuardandoEdicion(true)
    let imagen_url = formEditar.imagen_url
    if (archivoImagenEditar && usuario?.id) {
      const archivoFinal = archivoImagenEditar.size > 1_048_576
        ? await imageCompression(archivoImagenEditar, COMPRESSION_OPTIONS)
        : archivoImagenEditar
      const { url, error } = await subirImagen(archivoFinal, usuario.id)
      if (error) { setErrorEditar(error); setGuardandoEdicion(false); return }
      imagen_url = url
    }
    await actualizarServicio(editandoServicio.id, { ...formEditar, imagen_url })
    await cargarMisServicios()
    setGuardandoEdicion(false)
    setEditandoServicio(null)
  }

  return {
    mostrarForm, setMostrarForm,
    form, setForm, setField,
    archivoImagen, setArchivoImagen,
    previstaImagen, setPrevistaImagen,
    errorForm, setErrorForm,
    guardando,
    confirmEliminar, setConfirmEliminar,
    editandoServicio, setEditandoServicio,
    formEditar, setFormEditar,
    archivoImagenEditar, setArchivoImagenEditar,
    previstaImagenEditar, setPrevistaImagenEditar,
    errorEditar,
    guardandoEdicion,
    handleCrear,
    handleAbrirEditar,
    handleGuardarEdicion,
  }
}
