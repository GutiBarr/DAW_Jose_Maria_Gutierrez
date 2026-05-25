export interface Translations {
  nav: {
    servicios: string; comoFunciona: string; contacto: string; miPanel: string
    iniciarSesion: string; registrarse: string; cerrarSesion: string; salir: string
    modoClaro: string; modoOscuro: string
  }
  hero: {
    badge: string; titulo1: string; tituloResaltado: string; titulo2: string
    descripcion: string; ctaServicios: string; ctaCuenta: string
    stat1Value: string; stat1Label: string; stat2Value: string; stat2Label: string
    stat3Value: string; stat3Label: string
  }
  comoFunciona: {
    etiqueta: string; titulo: string; descripcion: string
    pasos: { titulo: string; descripcion: string }[]
  }
  catalogo: {
    etiqueta: string; titulo: string; descripcion: string
    filtroNombre: string; filtroNombrePlaceholder: string; filtroTipo: string
    filtroTipoTodos: string; filtroUbicacion: string; filtroUbicacionPlaceholder: string
    limpiarFiltros: string; buscar: string; buscando: string
    sinResultados: string; sinResultadosSub: string; resultados: (n: number) => string
    verDetalle: string; solicitarPlaza: string; ctaEntidad: string; ctaEntidadBtn: string
    sinPlazasDisponibles: string; plazasDisponibles: string; explorarTodos: string
    ctaNoTienes: string; ctaDesc: string; registrarFamilia: string
  }
  footer: {
    descripcion: string; activo: string; seccionPlataforma: string; verServicios: string
    comoFunciona: string; paraEntidades: string; paraFamilias: string; seccionLegal: string
    privacidad: string; terminos: string; accesibilidad: string; cookies: string
    seccionContacto: string; derechos: string; proyecto: string
  }
  login: {
    bienvenido: string; accedeTuPanel: string; gestionaDesde: string
    beneficio1: string; beneficio2: string; beneficio3: string
    titulo: string; sinCuenta: string; registrateGratis: string
    email: string; password: string; olvidaste: string; ver: string; ocultar: string
    iniciar: string; iniciando: string; errorRecarga: string
  }
  registro: {
    titulo: string; subtitulo: string; continuar: string
    terminosTexto: string; terminos: string; privacidad: string
    yaConCuenta: string; iniciaSesion: string
    familiasBadge: string; familiasTitulo: string; familiasDesc: string
    familiasF1: string; familiasF2: string; familiasF3: string
    entidadBadge: string; entidadTitulo: string; entidadDesc: string
    entidadF1: string; entidadF2: string; entidadF3: string
  }
  registroFamilia: {
    volver: string; etiqueta: string; titulo: string; descripcion: string
    tituloForm: string; yaConCuenta: string; iniciaSesion: string
    nombre: string; email: string; password: string; passwordPlaceholder: string
    confirmar: string; confirmarPlaceholder: string; acepto: string; terminos: string
    y: string; privacidad: string; crear: string; creando: string; ver: string; ocultar: string
    errPassNoCoinciden: string; errPassCorta: string; errTerminos: string
  }
  registroEntidad: {
    volver: string; etiqueta: string; titulo: string; descripcion: string
    tituloForm: string; yaConCuenta: string; iniciaSesion: string
    datosEntidad: string; nombreEntidad: string; cif: string
    personaContacto: string; nombreApellidos: string; telefono: string
    datosAcceso: string; email: string; password: string; passwordPlaceholder: string
    confirmar: string; confirmarPlaceholder: string; acepto: string; terminos: string
    y: string; privacidad: string; registrar: string; registrando: string; ver: string; ocultar: string
    errPassNoCoinciden: string; errPassCorta: string; errTerminos: string; errTelefono: string
  }
  perfil: {
    titulo: string; guardando: string; guardar: string; cancelar: string; editar: string
    nombre: string; email: string; emailInfo: string
    passwordActual: string; passwordNueva: string; passwordConfirmar: string; cambiarPassword: string
    datosEntidad: string; nombreEntidad: string; cif: string; personaContacto: string
    telefono: string; descripcion: string; web: string; ver: string; ocultar: string
    subtitulo: string; fotoPerfilTitulo: string; avatarFormato: string
    informacion: string; direccion: string; tipoCuenta: string
    rolAdmin: string; rolEntidad: string; rolFamilia: string
    passwordActualizada: string; cambiando: string; perfilActualizado: string; errTelefono: string
  }
  dashFamilia: {
    bienvenido: string; resumen: string; pendientes: string; aceptadas: string
    rechazadas: string; total: string; misSolicitudes: string; explorar: string
    sinSolicitudes: string; sinSolicitudesSub: string; estado: string; fecha: string
    servicio: string; entidad: string; mensaje: string; verDetalle: string
    pendienteLabel: string; aceptadaLabel: string; rechazadaLabel: string
    buscar: string; todosEstados: string; noSolicitudes: string; noFiltros: string
  }
  dashEntidad: {
    bienvenido: string; solicitudesRecibidas: string; misServicios: string
    nuevoServicio: string; sinSolicitudes: string; sinServicios: string
    aceptar: string; rechazar: string; eliminar: string; editar: string
    pendienteLabel: string; aceptadaLabel: string; rechazadaLabel: string
    guardar: string; cancelar: string; nombre: string; tipo: string; ubicacion: string
    telefono: string; descripcion: string; imagen: string; plazas: string
    publicar: string; publicando: string; actualizando: string; actualizar: string
    descripcionTexto: string; sinLimite: string; sinLimiteLabel: string
    sinPlazas: string; plazasLabel: string; descripcionPlaceholder: string; opcional: string
    sinServiciosSub: (nuevoServicio: string) => string
    buscarSolicitudes: string; todosEstados: string
    sinSolicitudesSub: string; noSolicitudes: string; noFiltros: string
    respuesta: string; responder: string; modificar: string
    responderSolicitud: string; modificarRespuesta: string; de: string
    yaRespondida: string; mensajeFamilia: string; explicaTuDecision: string
    guardando: string; enviarRespuesta: string; guardarCambios: string
    si: string; no: string
    confirmarEliminarTitulo: string; confirmarEliminarDesc: string
  }
  dashAdmin: {
    titulo: string; usuarios: string; entidades: string; servicios: string; solicitudes: string
    activar: string; desactivar: string; aprobar: string; rechazar: string
    activo: string; inactivo: string; pendiente: string; aprobado: string; sinDatos: string
    nombre: string; email: string; rol: string; estado: string; acciones: string
    cancelar: string; eliminar: string; familias: string; tu: string; tuCuenta: string
    descripcion: string; todosRoles: string; todosEstados: string; todosTipos: string
    buscarUsuarios: string; buscarServicios: string
    eliminarCuenta: string; desactivarCuenta: string; eliminarServicio: string
    confirmarEliminarCuenta: (nombre: string) => string
    confirmarDesactivar: (nombre: string) => string
    confirmarEliminarServicio: (nombre: string) => string
    siEliminar: string; siDesactivar: string
  }
  solicitarServicio: {
    titulo: string; mensaje: string; mensajePlaceholder: string; necesidad: string
    enviar: string; enviando: string; volver: string; exito: string; error: string
    subtitulo: string; exitoDesc: string
    nombreFamiliar: string; nombreFamiliarPlaceholder: string; urgenciaLabel: string
    errCampos: string; errServicio: string
    urgenciaBajaLabel: string; urgenciaBajaDesc: string
    urgenciaMediaLabel: string; urgenciaMediaDesc: string
    urgenciaAltaLabel: string; urgenciaAltaDesc: string
  }
  recuperarPassword: {
    titulo: string; descripcion: string; subtitulo: string; tituloForm: string
    enviar: string; enviando: string; volverLogin: string; error: string
    recuerdas: string; iniciaSesion: string
    exitoTitulo: string; exitoDesc: (email: string) => string
  }
  nuevaPassword: {
    titulo: string; subtituloLeft: string; tituloForm: string; minCaracteres: string
    guardar: string; guardando: string; verificando: string
    exitoTitulo: string; exitoDesc: string; irLogin: string; errorActualizar: string
  }
  notFound: {
    titulo: string; descripcion: string; volver: string
  }
}

export const es: Translations = {
  // Nav
  nav: {
    servicios: "Servicios",
    comoFunciona: "Cómo funciona",
    contacto: "Contacto",
    miPanel: "Mi panel",
    iniciarSesion: "Iniciar sesión",
    registrarse: "Registrarse",
    cerrarSesion: "Cerrar sesión",
    salir: "Salir",
    modoClaro: "Modo claro",
    modoOscuro: "Modo oscuro",
  },

  // Hero
  hero: {
    badge: "Plataforma de servicios · Extremadura",
    titulo1: "Encuentra el servicio",
    tituloResaltado: "que tu familia",
    titulo2: "necesita",
    descripcion:
      "Conectamos familias con personas dependientes con los mejores centros y servicios especializados de Extremadura.",
    ctaServicios: "Ver servicios disponibles",
    ctaCuenta: "Crear cuenta gratis",
    stat1Value: "+200",
    stat1Label: "servicios disponibles",
    stat2Value: "180+",
    stat2Label: "entidades colaboradoras",
    stat3Value: "2.400+",
    stat3Label: "familias registradas",
  },

  // Cómo funciona
  comoFunciona: {
    etiqueta: "Cómo funciona",
    titulo: "De la búsqueda a la plaza en 4 pasos",
    descripcion:
      "Un proceso sencillo y transparente para que las familias encuentren el servicio adecuado sin complicaciones.",
    pasos: [
      {
        titulo: "Explora los servicios",
        descripcion:
          "Navega por el catálogo de servicios disponibles en Extremadura. Filtra por tipo, ubicación o nombre para encontrar lo que necesitas.",
      },
      {
        titulo: "Crea tu cuenta",
        descripcion:
          "Regístrate como familia en menos de un minuto. Solo necesitas tu nombre, email y contraseña.",
      },
      {
        titulo: "Solicita una plaza",
        descripcion:
          "Envía una solicitud al servicio que te interesa indicando el tipo de necesidad y un mensaje para la entidad.",
      },
      {
        titulo: "Recibe respuesta",
        descripcion:
          "La entidad revisará tu solicitud y te responderá con un mensaje de aceptación o rechazo desde su panel.",
      },
    ],
  },

  // Catálogo
  catalogo: {
    etiqueta: "Catálogo",
    titulo: "Servicios disponibles",
    descripcion:
      "Todos los servicios están verificados y publicados por entidades colaboradoras de Extremadura.",
    filtroNombre: "Nombre",
    filtroNombrePlaceholder: "Buscar por nombre...",
    filtroTipo: "Tipo de servicio",
    filtroTipoTodos: "Todos los tipos",
    filtroUbicacion: "Ubicación",
    filtroUbicacionPlaceholder: "Ciudad o provincia...",
    limpiarFiltros: "Limpiar filtros",
    buscar: "Buscar",
    buscando: "Buscando servicios...",
    sinResultados: "No se encontraron servicios",
    sinResultadosSub: "Prueba a cambiar los filtros",
    resultados: (n: number) =>
      `${n} servicio${n !== 1 ? "s" : ""} encontrado${n !== 1 ? "s" : ""}`,
    verDetalle: "Ver detalle",
    solicitarPlaza: "Solicitar plaza",
    ctaEntidad: "¿Eres una entidad y quieres publicar tus servicios?",
    ctaEntidadBtn: "Registrar mi entidad",
    sinPlazasDisponibles: "Sin plazas disponibles",
    plazasDisponibles: "plazas disponibles",
    explorarTodos: "Explorar todos los servicios",
    ctaNoTienes: "¿Aún no tienes cuenta en ConciliaEx?",
    ctaDesc: "Únete a nuestra plataforma para encontrar o publicar servicios especializados en Extremadura.",
    registrarFamilia: "Registrarse como Familia",
  },

  // Footer
  footer: {
    descripcion:
      "Plataforma de conexión entre familias con personas dependientes y servicios especializados en Extremadura.",
    activo: "Servicio activo · Extremadura",
    seccionPlataforma: "Plataforma",
    verServicios: "Ver servicios",
    comoFunciona: "Cómo funciona",
    paraEntidades: "Para entidades",
    paraFamilias: "Para familias",
    seccionLegal: "Legal",
    privacidad: "Privacidad",
    terminos: "Términos de uso",
    accesibilidad: "Accesibilidad",
    cookies: "Cookies",
    seccionContacto: "Contacto",
    derechos: "Todos los derechos reservados.",
    proyecto: "Proyecto Intermodular DAW · IES Albarregas, Mérida",
  },

  // Login
  login: {
    bienvenido: "Bienvenido",
    accedeTuPanel: "Accede a tu panel",
    gestionaDesde: "Gestiona perfiles, solicitudes y servicios desde un único lugar.",
    beneficio1: "Busca servicios adaptados a tu familiar",
    beneficio2: "Envía solicitudes a entidades especializadas",
    beneficio3: "Sigue el estado de tus solicitudes",
    titulo: "Iniciar sesión",
    sinCuenta: "¿No tienes cuenta?",
    registrateGratis: "Regístrate gratis",
    email: "Correo electrónico",
    password: "Contraseña",
    olvidaste: "¿Olvidaste la contraseña?",
    ver: "Ver",
    ocultar: "Ocultar",
    iniciar: "Iniciar sesión",
    iniciando: "Iniciando sesión...",
    errorRecarga: "Error al iniciar sesión, recarga la página",
  },

  // Registro (selector de rol)
  registro: {
    titulo: "Crea tu cuenta",
    subtitulo: "Elige el tipo de cuenta que mejor se adapta a tu situación",
    continuar: "Continuar",
    terminosTexto: "Al registrarte aceptas nuestros",
    terminos: "términos y condiciones",
    privacidad: "política de privacidad",
    yaConCuenta: "¿Ya tienes cuenta?",
    iniciaSesion: "Inicia sesión",
    familiasBadge: "Para familias",
    familiasTitulo: "Busco servicios para mi familiar",
    familiasDesc:
      "Encuentra recursos adaptados, envía solicitudes y sigue su estado desde tu panel.",
    familiasF1: "Búsqueda filtrada de servicios",
    familiasF2: "Solicitudes a entidades",
    familiasF3: "Seguimiento en tiempo real",
    entidadBadge: "Para entidades",
    entidadTitulo: "Quiero publicar mis servicios",
    entidadDesc:
      "Publica tus servicios, recibe solicitudes de familias y gestiona tu panel desde un solo lugar.",
    entidadF1: "Publicación de servicios",
    entidadF2: "Gestión de solicitudes",
    entidadF3: "Estadísticas de visibilidad",
  },

  // Registro familia
  registroFamilia: {
    volver: "Volver",
    etiqueta: "Cuenta de familia",
    titulo: "Encuentra el apoyo que necesitas",
    descripcion:
      "Regístrate y accede a cientos de servicios y entidades especializadas en toda Extremadura.",
    tituloForm: "Crear cuenta de familia",
    yaConCuenta: "¿Ya tienes cuenta?",
    iniciaSesion: "Inicia sesión",
    nombre: "Nombre completo",
    email: "Correo electrónico",
    password: "Contraseña",
    passwordPlaceholder: "Mínimo 6 caracteres",
    confirmar: "Confirmar contraseña",
    confirmarPlaceholder: "Repite tu contraseña",
    acepto: "Acepto los",
    terminos: "términos y condiciones",
    y: "y la",
    privacidad: "política de privacidad",
    crear: "Crear cuenta",
    creando: "Creando cuenta...",
    ver: "Ver",
    ocultar: "Ocultar",
    errPassNoCoinciden: "Las contraseñas no coinciden",
    errPassCorta: "La contraseña debe tener mínimo 6 caracteres",
    errTerminos: "Debes aceptar los términos y condiciones",
    errTelefono: "El teléfono no es válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9",
  },

  // Registro entidad
  registroEntidad: {
    volver: "Volver",
    etiqueta: "Cuenta de entidad",
    titulo: "Llega a las familias que te necesitan",
    descripcion:
      "Publica tus servicios y conecta con las familias de Extremadura que buscan exactamente lo que ofreces.",
    tituloForm: "Registrar entidad",
    yaConCuenta: "¿Ya tienes cuenta?",
    iniciaSesion: "Inicia sesión",
    datosEntidad: "Datos de la entidad",
    nombreEntidad: "Nombre de la entidad",
    cif: "CIF",
    personaContacto: "Persona de contacto",
    nombreApellidos: "Nombre y apellidos",
    telefono: "Teléfono",
    datosAcceso: "Datos de acceso",
    email: "Correo electrónico",
    password: "Contraseña",
    passwordPlaceholder: "Mínimo 6 caracteres",
    confirmar: "Confirmar contraseña",
    confirmarPlaceholder: "Repite tu contraseña",
    acepto: "Acepto los",
    terminos: "términos y condiciones",
    y: "y la",
    privacidad: "política de privacidad",
    registrar: "Registrar entidad",
    registrando: "Creando cuenta...",
    ver: "Ver",
    ocultar: "Ocultar",
    errPassNoCoinciden: "Las contraseñas no coinciden",
    errPassCorta: "La contraseña debe tener mínimo 6 caracteres",
    errTerminos: "Debes aceptar los términos y condiciones",
    errTelefono: "El teléfono no es válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9",
  },

  // Perfil
  perfil: {
    titulo: "Mi perfil",
    guardando: "Guardando...",
    guardar: "Guardar cambios",
    cancelar: "Cancelar",
    editar: "Editar",
    nombre: "Nombre completo",
    email: "Correo electrónico",
    emailInfo: "El correo electrónico no se puede cambiar.",
    passwordActual: "Contraseña actual",
    passwordNueva: "Nueva contraseña",
    passwordConfirmar: "Confirmar nueva contraseña",
    cambiarPassword: "Cambiar contraseña",
    datosEntidad: "Datos de la entidad",
    nombreEntidad: "Nombre de la entidad",
    cif: "CIF",
    personaContacto: "Persona de contacto",
    telefono: "Teléfono",
    descripcion: "Descripción",
    web: "Sitio web",
    ver: "Ver",
    ocultar: "Ocultar",
    subtitulo: "Actualiza tu información personal y foto de perfil",
    fotoPerfilTitulo: "Foto de perfil",
    avatarFormato: "JPG, PNG o WEBP. Máximo 5MB.",
    informacion: "Información",
    direccion: "Dirección",
    tipoCuenta: "Tipo de cuenta",
    rolAdmin: "Administrador",
    rolEntidad: "Entidad",
    rolFamilia: "Familia",
    passwordActualizada: "Contraseña actualizada correctamente",
    cambiando: "Cambiando...",
    perfilActualizado: "Perfil actualizado correctamente",
    errTelefono: "El teléfono no es válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9",
  },

  // Dashboard familia
  dashFamilia: {
    bienvenido: "Bienvenido,",
    resumen: "Resumen de tus solicitudes",
    pendientes: "Pendientes",
    aceptadas: "Aceptadas",
    rechazadas: "Rechazadas",
    total: "Total",
    misSolicitudes: "Mis solicitudes",
    explorar: "Explorar servicios",
    sinSolicitudes: "Aún no tienes solicitudes",
    sinSolicitudesSub: "Explora el catálogo y solicita una plaza.",
    estado: "Estado",
    fecha: "Fecha",
    servicio: "Servicio",
    entidad: "Entidad",
    mensaje: "Mensaje",
    verDetalle: "Ver detalle",
    pendienteLabel: "Pendiente",
    aceptadaLabel: "Aceptada",
    rechazadaLabel: "Rechazada",
    buscar: "Buscar por servicio o entidad...",
    todosEstados: "Todos los estados",
    noSolicitudes: "No se encontraron solicitudes",
    noFiltros: "Intenta con otros filtros de búsqueda",
  },

  // Dashboard entidad
  dashEntidad: {
    bienvenido: "Panel de",
    solicitudesRecibidas: "Solicitudes recibidas",
    misServicios: "Mis servicios",
    nuevoServicio: "Nuevo servicio",
    sinSolicitudes: "Sin solicitudes todavía",
    sinServicios: "No tienes servicios publicados todavía.",
    aceptar: "Aceptar",
    rechazar: "Rechazar",
    eliminar: "Eliminar",
    editar: "Editar",
    pendienteLabel: "Pendiente",
    aceptadaLabel: "Aceptada",
    rechazadaLabel: "Rechazada",
    guardar: "Guardar",
    cancelar: "Cancelar",
    nombre: "Nombre del servicio",
    tipo: "Tipo",
    ubicacion: "Ubicación",
    telefono: "Teléfono",
    descripcion: "Descripción",
    imagen: "URL de imagen (opcional)",
    plazas: "Plazas disponibles",
    publicar: "Publicar servicio",
    publicando: "Publicando...",
    actualizando: "Actualizando...",
    actualizar: "Actualizar servicio",
    descripcionTexto: "Gestiona tus servicios y solicitudes recibidas",
    sinLimite: "Vacío = sin límite",
    sinLimiteLabel: "Sin límite",
    sinPlazas: "Sin plazas",
    plazasLabel: "plazas",
    descripcionPlaceholder: "Describe el servicio...",
    opcional: "opcional",
    sinServiciosSub: (nuevoServicio: string) => `Pulsa "+ ${nuevoServicio}" para empezar`,
    buscarSolicitudes: "Buscar por servicio o familia...",
    todosEstados: "Todos los estados",
    sinSolicitudesSub: "Cuando las familias soliciten tus servicios aparecerán aquí",
    noSolicitudes: "No se encontraron solicitudes",
    noFiltros: "Intenta con otros filtros de búsqueda",
    respuesta: "Respuesta",
    responder: "Responder",
    modificar: "Modificar",
    responderSolicitud: "Responder solicitud",
    modificarRespuesta: "Modificar respuesta",
    de: "De",
    yaRespondida: "Esta solicitud ya fue respondida. Puedes cambiar la decisión.",
    mensajeFamilia: "Mensaje para la familia *",
    explicaTuDecision: "Explica tu decisión...",
    guardando: "Guardando...",
    enviarRespuesta: "Enviar respuesta",
    guardarCambios: "Guardar cambios",
    si: "Sí",
    no: "No",
    confirmarEliminarTitulo: "¿Eliminar servicio?",
    confirmarEliminarDesc: "Esta acción no se puede deshacer. El servicio será eliminado permanentemente.",
  },

  // Dashboard admin
  dashAdmin: {
    titulo: "Panel de Administración",
    usuarios: "Usuarios",
    entidades: "Entidades pendientes",
    servicios: "Servicios",
    solicitudes: "Solicitudes",
    activar: "Activar",
    desactivar: "Desactivar",
    aprobar: "Aprobar",
    rechazar: "Rechazar",
    activo: "Activo",
    inactivo: "Inactivo",
    pendiente: "Pendiente",
    aprobado: "Aprobado",
    sinDatos: "No hay datos",
    nombre: "Nombre",
    email: "Email",
    rol: "Rol",
    estado: "Estado",
    acciones: "Acciones",
    cancelar: "Cancelar",
    eliminar: "Eliminar",
    familias: "Familias",
    tu: "Tú",
    tuCuenta: "Tu cuenta",
    descripcion: "Gestiona usuarios y servicios de la plataforma",
    todosRoles: "Todos los roles",
    todosEstados: "Todos los estados",
    todosTipos: "Todos los tipos",
    buscarUsuarios: "Buscar por nombre o email...",
    buscarServicios: "Buscar por nombre o ubicación...",
    eliminarCuenta: "Eliminar cuenta",
    desactivarCuenta: "Desactivar cuenta",
    eliminarServicio: "Eliminar servicio",
    confirmarEliminarCuenta: (nombre: string) =>
      `¿Estás seguro de que quieres eliminar la cuenta de "${nombre}"? Esta acción no se puede deshacer y eliminará también todos sus servicios.`,
    confirmarDesactivar: (nombre: string) =>
      `¿Estás seguro de que quieres desactivar la cuenta de "${nombre}"? Sus servicios dejarán de aparecer en el catálogo.`,
    confirmarEliminarServicio: (nombre: string) =>
      `¿Estás seguro de que quieres eliminar el servicio "${nombre}"? Esta acción no se puede deshacer.`,
    siEliminar: "Sí, eliminar",
    siDesactivar: "Sí, desactivar",
  },

  // Solicitar servicio
  solicitarServicio: {
    titulo: "Solicitar plaza",
    mensaje: "Mensaje para la entidad",
    mensajePlaceholder: "Describe brevemente la necesidad y cualquier información relevante...",
    necesidad: "Tipo de necesidad",
    enviar: "Enviar solicitud",
    enviando: "Enviando...",
    volver: "Volver",
    exito: "Solicitud enviada correctamente",
    error: "Error al enviar la solicitud",
    subtitulo: "Completa el formulario y la entidad recibirá tu solicitud",
    exitoDesc: "La entidad revisará tu solicitud y te responderá en breve. Puedes ver el estado en tu panel.",
    nombreFamiliar: "Nombre del familiar *",
    nombreFamiliarPlaceholder: "Nombre y apellidos",
    urgenciaLabel: "Urgencia *",
    errCampos: "Rellena todos los campos obligatorios",
    errServicio: "Servicio no encontrado",
    urgenciaBajaLabel: "Baja",
    urgenciaBajaDesc: "Sin prisa, buscando opciones",
    urgenciaMediaLabel: "Media",
    urgenciaMediaDesc: "Necesario en los próximos meses",
    urgenciaAltaLabel: "Alta",
    urgenciaAltaDesc: "Necesidad inmediata",
  },

  // Recuperar contraseña
  recuperarPassword: {
    titulo: "Recupera tu acceso",
    descripcion: "Introduce tu correo y te enviaremos un enlace para restablecer tu contraseña.",
    subtitulo: "Introduce tu email y te enviamos un enlace de recuperación.",
    tituloForm: "¿Olvidaste tu contraseña?",
    enviar: "Enviar enlace de recuperación",
    enviando: "Enviando...",
    volverLogin: "Volver al inicio de sesión",
    error: "No se pudo enviar el correo. Comprueba el email introducido.",
    recuerdas: "¿Recuerdas tu contraseña?",
    iniciaSesion: "Inicia sesión",
    exitoTitulo: "Correo enviado",
    exitoDesc: (email: string) =>
      `Hemos enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada y sigue las instrucciones.`,
  },

  // Nueva contraseña
  nuevaPassword: {
    titulo: "Nueva contraseña",
    subtituloLeft: "Elige una contraseña segura de al menos 6 caracteres.",
    tituloForm: "Elige una nueva contraseña",
    minCaracteres: "Mínimo 6 caracteres.",
    guardar: "Guardar nueva contraseña",
    guardando: "Guardando...",
    verificando: "Verificando enlace...",
    exitoTitulo: "Contraseña actualizada",
    exitoDesc: "Tu contraseña se ha cambiado correctamente. Redirigiendo al inicio de sesión...",
    irLogin: "Ir al inicio de sesión",
    errorActualizar: "No se pudo actualizar la contraseña. Inténtalo de nuevo.",
  },

  // NotFound
  notFound: {
    titulo: "Página no encontrada",
    descripcion: "La página que buscas no existe o ha sido movida.",
    volver: "Volver al inicio",
  },
}
