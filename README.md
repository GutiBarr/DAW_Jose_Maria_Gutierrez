# ConciliaEx

Plataforma web que conecta a familias con personas dependientes con entidades especializadas en servicios de conciliación familiar en Extremadura.

Proyecto intermodular de fin de ciclo — DAW · IES Albarregas · José María Gutiérrez Barrero

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y uso](#instalación-y-uso)
- [Variables de entorno](#variables-de-entorno)
- [Roles de usuario](#roles-de-usuario)
- [Funcionalidades principales](#funcionalidades-principales)
- [Base de datos](#base-de-datos)
- [Documentación](#documentación)

---

## Descripción

ConciliaEx es una SPA (Single Page Application) que facilita la búsqueda, gestión y solicitud de servicios de conciliación familiar. La plataforma centraliza la oferta de entidades colaboradoras y permite a las familias encontrar y solicitar plazas de manera sencilla, con un panel de administración completo para la gestión global de usuarios y servicios.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + TypeScript |
| Bundler | Vite 8 |
| Estilos | Tailwind CSS 4 (variables CSS, dark/light mode) |
| Tipografía | Geist Variable |
| Componentes | Radix UI + shadcn/ui |
| Iconos | Lucide React |
| Estado global | Zustand 5 |
| Backend / BaaS | Supabase (PostgreSQL + Auth + Storage) |
| Routing | React Router 7 |
| Internacionalización | i18n propio (es / en) |

---

## Arquitectura

```
src/
├── components/       # Componentes reutilizables (layout, dashboard, landing)
├── database/
│   ├── repositories/ # Interfaces del patrón repositorio
│   └── supabase/     # Implementaciones con Supabase JS
├── hooks/            # Hooks personalizados (filtros, formularios)
├── i18n/             # Traducciones es.ts / en.ts + hook useT()
├── interfaces/       # Tipos TypeScript del dominio
├── lib/              # Utilidades, constantes y validaciones
├── pages/            # Vistas por rol (landing, familia, entidad, admin, legal)
└── store/            # Stores de Zustand (auth, servicio, solicitud, perfil, tema, idioma)
```

**Patrón repositorio:** toda la lógica de acceso a datos se abstrae detrás de interfaces en `repositories/`. Los componentes y stores solo conocen la interfaz, no la implementación de Supabase.

**Autenticación:** `onAuthStateChange` sincroniza el estado de sesión sin llamadas extra a la red. El flag `inicializado` en `authStore` impide renderizar rutas protegidas hasta que la verificación termina, evitando parpadeos y redirecciones prematuras.

**Prevención de race conditions:** las funciones de carga críticas usan un ID de petición (`requestId`) para descartar respuestas de peticiones obsoletas, especialmente relevante en React StrictMode.

---

## Estructura del proyecto

```
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard/       # Cards, skeletons, DataTable, KPI
│   │   ├── landing/         # Hero, Catalogo, Stats, Pricing, Footer
│   │   └── layout/          # Navbar, Footer, ProtectedRoute, AuthGuard
│   ├── database/
│   │   ├── repositories/    # AdminRepository, ServicioRepository…
│   │   └── supabase/        # Implementaciones + Client.ts
│   ├── hooks/
│   │   └── useAdminFiltros.ts
│   ├── i18n/
│   │   ├── es.ts
│   │   ├── en.ts
│   │   └── useT.ts
│   ├── interfaces/          # Perfil, Servicio, Solicitud, Usuario
│   ├── lib/
│   │   ├── constants.ts
│   │   └── validaciones.ts
│   ├── pages/
│   │   ├── admin/           # DashboardAdmin
│   │   ├── entidad/         # DashboardEntidad
│   │   ├── familia/         # DashboardFamilia, SolicitarServicio
│   │   ├── legal/           # Privacidad, Términos, Accesibilidad, Cookies
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Registro.tsx
│   │   ├── RegistroFamilia.tsx
│   │   ├── RegistroEntidad.tsx
│   │   └── Perfil.tsx
│   └── store/
│       ├── authStore.ts
│       ├── servicioStore.ts
│       ├── solicitudStore.ts
│       ├── perfilStore.ts
│       ├── themeStore.ts
│       └── langStore.ts
├── .env.local
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Instalación y uso

**Requisitos:** Node.js 18+ y una cuenta en [Supabase](https://supabase.com).

```bash
# 1. Clonar el repositorio
git clone https://github.com/GutiBarr/conciliaex.git
cd conciliaex

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (ver sección siguiente)
cp .env.example .env.local

# 4. Iniciar en desarrollo
npm run dev

# 5. Compilar para producción
npm run build
```

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz con las siguientes claves obtenidas desde el dashboard de Supabase (Settings → API):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

> El proyecto usa exclusivamente `localStorage` para persistencia local. No utiliza cookies de ningún tipo.

---

## Roles de usuario

| Rol | Descripción |
|---|---|
| `familia` | Puede explorar el catálogo, solicitar plazas y gestionar sus solicitudes |
| `entidad` | Puede publicar y gestionar sus propios servicios y las solicitudes recibidas |
| `admin` | Acceso completo: gestión de usuarios, servicios y estadísticas globales |

El rol se asigna en el momento del registro y se almacena en la tabla `perfiles` de Supabase.

---

## Funcionalidades principales

**Catálogo público**
- Búsqueda por nombre de servicio o entidad, tipo y ubicación
- Filtrado en tiempo real con debounce
- Modal de detalle con información completa y badge de entidad

**Panel de familia**
- Solicitud de plazas con mensaje personalizado
- Seguimiento del estado de cada solicitud (pendiente, aceptada, rechazada)
- Historial completo con modal de detalle

**Panel de entidad**
- Alta, edición y eliminación de servicios propios
- Gestión de plazas disponibles
- Revisión y resolución de solicitudes recibidas
- Subida de imagen de portada y foto de perfil

**Panel de administración**
- Tabla de usuarios con filtros por rol, estado y búsqueda de texto
- Tabla de servicios con filtros por tipo, estado y entidad
- Cambio de rol, activación/desactivación y eliminación de usuarios
- Estadísticas globales (KPIs)

**Autenticación**
- Registro separado para familias y entidades con validación por campo
- Inicio de sesión con email y contraseña
- Recuperación y restablecimiento de contraseña por correo

**Internacionalización**
- Idioma español e inglés seleccionable desde la navbar
- Persistido en `localStorage` mediante `langStore`

**Tema visual**
- Modo claro y oscuro con variables CSS
- Valor por defecto: modo claro
- Persistido en `localStorage` mediante `themeStore`

---

## Base de datos

El esquema principal de Supabase incluye las siguientes tablas:

| Tabla | Descripción |
|---|---|
| `perfiles` | Datos de usuario vinculados a `auth.users` (nombre, rol, entidad, avatar…) |
| `servicios` | Servicios publicados por entidades (tipo, ubicación, plazas, imagen…) |
| `solicitudes` | Solicitudes de familias a servicios (estado, mensaje, fechas…) |

La eliminación de usuarios requiere la función SQL `admin_delete_user` (SECURITY DEFINER) creada manualmente en el SQL Editor de Supabase, que borra en cascada servicios, solicitudes, perfil y registro de autenticación.

---

## Documentación

La carpeta `/Documentacion` contiene los manuales completos del proyecto:

| Documento | Descripción |
|---|---|
| [Manual de Usuario](./Documentacion/Manual_Usuario.ConciliaEx.pdf) | Guía de uso para familias, entidades y administradores |
| [Manual Técnico](./Documentacion/Manual_Tecnico.ConciliaEx.pdf) | Arquitectura, modelo de datos, autenticación y decisiones de diseño |
| [Manual de Despliegue](./Documentacion/Manual_Despliegue.ConciliaEx.pdf) | Pasos para desplegar en Vercel/Netlify con Supabase como backend |
| [Manual del Proyecto](./Documentacion/Manual_Proyecto.ConciliaEx.pdf) | Contexto académico, evolución y planificación del proyecto |

---

## Autor

**José María Gutiérrez Barrero**
Ciclo Formativo de Grado Superior — Desarrollo de Aplicaciones Web
IES Albarregas · Mérida, Extremadura

Contacto: conciliaex@gmail.com
