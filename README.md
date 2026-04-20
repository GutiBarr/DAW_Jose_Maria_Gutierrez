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
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
