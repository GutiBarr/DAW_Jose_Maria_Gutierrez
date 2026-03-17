# 👨‍👩‍👦‍👦 ConciliaEx - Plataforma SPA para Familias

> *Un gran proyecto diseñado para integrar, conectar y asistir a las familias con personas dependientes en Extremadura. Evolucionado desde un prototipo en bruto hasta una SPA Moderna.*

Bienvenido a la carpeta principal de **ConciliaEx**. Este repositorio contiene tanto la fase inicial (Prototipo HTML) como toda la documentación arquitectónica para la fase definitiva de integración de la Single Page Application (SPA).

## 🚀 Arquitectura Tecnológica Definitiva
El proyecto abandonará el clásico esquema monolítico en favor del "stack moderno":
1. ⚛️ **React UI**: Interfaz orientada a componentes modulares (`.jsx`).
2. 🎨 **Tailwind CSS**: Estilado fluido *"utility-first"* (abandonando el clásico `styles.css`).
3. ☁️ **Supabase BaaS**: Motor de base de datos relacional (PostgreSQL) y sistema completo de Autenticación de sesiones por JWT/OAuth.
4. 🐻 **Zustand**: Gestor de estado global super-ligero (ej: datos de sesión logueada en toda la app).
5. 🔀 **React Router**: Navegación fluida *Client-Side* para cambiar entre el Home, el Login y el Panel de Control sin recargar la web.

> *Nota: Actualmente los ficheros `.html` de la raíz fueron la base (prueba de concepto) originada del [diseño en Figma](https://www.figma.com/design/jeuH9YDGnjiam3n1SJGBd1/ProyectoFinGrado).*

## 📚 Índice de Documentación (Carperta /Documentacion)
En este proyecto se han elaborado manuales exhaustivos considerando esta arquitectura avanzada de Cliente/Servidor. Puedes encontrarlos dentro de la carpeta **Documentacion**:

- 👤 [Manual de Usuario](./Documentacion/Manual_Usuario.md): Conozca cómo navegar e interactuar con las pantallas del portal. Aborda las nuevas zonas para familias y entidades de la futura SPA.
- 👨‍💻 [Manual Técnico](./Documentacion/Manual_Tecnico.md): Aborda al detalle la integración React, el uso del paquete `@supabase/auth`, creación de base de datos relacional en Postgres y la adopción de Tailwind y Zustand.
- 🚀 [Manual de Despliegue](./Documentacion/Manual_Despliegue.md): Resumen de cómo alzar este proyecto pasando del servidor de desarrollo clásico al empaquetador eficiente de **Vite** y posterior subida gratuita unifilando Backend en Supabase y Frontend en Vercel o Netlify.
- 📊 [Manual del Proyecto](./Documentacion/Manual_Proyecto.md): Describe el ciclo formativo, la evolución del prototipo a la SPA definitiva y el refinamiento modular que esto conlleva.

---
*Desarrollado para el Proyecto Intermodular de Desarrollo de Aplicaciones Web (DAW).*
