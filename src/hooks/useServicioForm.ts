import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useServicioStore } from "@/store/servicioStore"
import { useLangStore } from "@/store/langStore"
import type { Servicio, DatosCrearServicio } from "@/interfaces/Servicio"

const FORM_VACIO: DatosCrearServicio = {
  nombre: "", descripcion: "", tipo: "Centro de Día",
  ubicacion: "", telefono: "", imagen_url: "", plazas: null,
}

export function useServicioForm() {
  const { usuario }                                           = useAuthStore()
  const { crearServicio, actualizarServicio, subirImagen, cargarMisServicios } = useServicioStore()
  const { lang }                                             = useLangStore()

  const [mostrarForm, setMostrarForm]           = useState(false)
  const [form, setForm]                         = useState<DatosCrearServicio>(FORM_VACIO)
  const [archivoImagen, setArchivoImagen]       = useState<File | null>(null)
  const [previstaImagen, setPrevistaImagen]     = useState("")
  const [errorForm, setErrorForm]               = useState("")
  const [guardando, setGuardando]               = useState(false)
  const [confirmEliminar, setConfirmEliminar]   = useState<string | null>(null)
  const [editandoServicio, setEditandoServicio] = useState<Servicio | null>(null)
  const [formEditar, setFormEditar]             = useState<DatosCrearServicio>(FORM_VACIO)
  const [guardandoEdicion, setGuardandoEdicion] = useState(false)

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
    setGuardando(true)
    let imagen_url = form.imagen_url
    if (archivoImagen && usuario?.id) {
      const { url, error } = await subirImagen(archivoImagen, usuario.id)
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
  }

  const handleGuardarEdicion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editandoServicio) return
    setGuardandoEdicion(true)
    await actualizarServicio(editandoServicio.id, formEditar)
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
    guardandoEdicion,
    handleCrear,
    handleAbrirEditar,
    handleGuardarEdicion,
  }
}
