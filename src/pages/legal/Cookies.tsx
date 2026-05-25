import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const localStorageItems = [
  {
    clave: "sb-[ref]-auth-token",
    proposito: "Sesión de autenticación Supabase",
    tipo: "Esencial",
    descripcion:
      "Token de sesión generado por Supabase al iniciar sesión. Permite que el usuario permanezca autenticado mientras navega por la plataforma sin necesidad de volver a introducir sus credenciales.",
  },
  {
    clave: "conciliaex-auth",
    proposito: "Datos de usuario en sesión",
    tipo: "Esencial",
    descripcion:
      "Almacena información básica del usuario autenticado (rol, identificador) para que la interfaz pueda personalizar el contenido mostrado sin consultar el servidor en cada carga.",
  },
  {
    clave: "conciliaex-theme",
    proposito: "Preferencia de tema visual",
    tipo: "Funcional",
    descripcion:
      "Guarda la preferencia del usuario entre el modo claro y el modo oscuro. Permite que la plataforma recuerde y aplique automáticamente el tema elegido en futuras visitas.",
  },
  {
    clave: "conciliaex-lang",
    proposito: "Preferencia de idioma",
    tipo: "Funcional",
    descripcion:
      "Guarda la preferencia de idioma del usuario (español o inglés) para mantener la selección entre sesiones.",
  },
]

export default function Cookies() {
  return (
    <>
      <Header variant="landing" />

      <main className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <div className="py-20 bg-muted/30 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Política de Cookies y Almacenamiento Local
            </h1>
            <p className="text-sm text-muted-foreground">
              Última actualización: mayo de 2025
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 space-y-12">

          {/* 1. ¿Usamos cookies? */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              1. ¿ConciliaEx usa cookies?
            </h2>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <p className="text-sm font-semibold text-emerald-500">
                No. ConciliaEx no utiliza cookies HTTP de ningún tipo.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Las <strong className="text-foreground">cookies</strong> son pequeños archivos de
              texto que los servidores web envían al navegador y que este devuelve automáticamente
              en cada petición. ConciliaEx{" "}
              <strong className="text-foreground">no establece ninguna cookie</strong> en tu
              navegador, ni propias ni de terceros.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Esto significa que no existe el clásico banner de aceptación de cookies porque
              sencillamente no hay nada que aceptar. Tu navegación por ConciliaEx no genera
              ninguna cookie en tu dispositivo.
            </p>
          </section>

          {/* 2. localStorage */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              2. Qué usamos en lugar de cookies: localStorage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Para ofrecer funcionalidades esenciales como mantener la sesión iniciada o recordar
              tus preferencias, ConciliaEx utiliza el{" "}
              <strong className="text-foreground">localStorage</strong> de tu navegador.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El localStorage es una tecnología distinta a las cookies: los datos se almacenan
              únicamente en tu dispositivo y{" "}
              <strong className="text-foreground">
                nunca se envían automáticamente al servidor
              </strong>{" "}
              con cada petición. Son completamente locales y solo ConciliaEx puede leer los datos
              que él mismo ha guardado, dentro del contexto de tu navegador.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A diferencia de las cookies, el localStorage no tiene fecha de expiración automática:
              los datos permanecen hasta que el usuario cierra sesión, limpia el almacenamiento
              de su navegador o desinstala la aplicación.
            </p>
          </section>

          {/* 3. Tabla localStorage */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              3. Elementos almacenados en localStorage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A continuación se detallan todos los elementos que ConciliaEx puede guardar en el
              localStorage de tu navegador:
            </p>

            <div className="space-y-4">
              {localStorageItems.map((item) => (
                <div
                  key={item.clave}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded text-foreground">
                        {item.clave}
                      </code>
                      <p className="text-sm font-medium text-foreground mt-2">
                        {item.proposito}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                        item.tipo === "Esencial"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.tipo}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Sin rastreo ni terceros */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              4. Sin rastreo ni servicios de terceros
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ConciliaEx no integra ningún servicio externo de rastreo o análisis de
              comportamiento. Concretamente:
            </p>
            <ul className="space-y-2">
              {[
                "No se utiliza Google Analytics ni ninguna otra herramienta de analítica web.",
                "No se cargan píxeles de seguimiento de redes sociales (Facebook, Instagram, X, LinkedIn, etc.).",
                "No se usan scripts publicitarios ni redes de publicidad.",
                "No se integran botones de compartir en redes sociales que puedan rastrear tu actividad.",
                "El único servicio externo utilizado es Supabase (base de datos e infraestructura), que opera en servidores de la Unión Europea y cumple con el RGPD.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Cómo limpiar */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              5. Cómo limpiar el almacenamiento local de tu navegador
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Si deseas eliminar los datos que ConciliaEx ha guardado en tu navegador, puedes
              hacerlo de las siguientes formas:
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Opción A: Cerrar sesión en ConciliaEx
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Al cerrar sesión desde la plataforma, los datos de autenticación almacenados
                  en localStorage se eliminan automáticamente. Las preferencias de tema e idioma
                  pueden permanecer para futuras visitas.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Opción B: Mediante las herramientas de desarrollo del navegador
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  En cualquier navegador moderno puedes acceder a las herramientas de desarrollo
                  y eliminar el localStorage de un sitio concreto:
                </p>
                <ol className="space-y-1.5">
                  {[
                    "Abre las herramientas de desarrollo con F12 (o Ctrl+Mayús+I / Cmd+Option+I en Mac).",
                    'Ve a la pestaña "Application" (Chrome/Edge) o "Storage" (Firefox).',
                    'En el panel izquierdo, despliega "Local Storage" y selecciona el dominio de ConciliaEx.',
                    "Selecciona las entradas que quieres eliminar y pulsa la tecla Supr, o haz clic derecho y elige \"Eliminar\".",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Opción C: Borrar datos del sitio desde la configuración del navegador
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Desde la configuración de privacidad de tu navegador puedes borrar todos los datos
                  almacenados por un sitio web concreto (cookies, localStorage, caché). Busca la
                  opción "Privacidad y seguridad" &rarr; "Configuración del sitio" &rarr; "Ver los
                  permisos y datos almacenados en todos los sitios" (Chrome/Edge) o equivalente en
                  tu navegador.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Por qué no necesitamos consentimiento */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              6. Por qué no necesitamos tu consentimiento para cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              La normativa europea sobre privacidad en comunicaciones electrónicas (Directiva
              ePrivacy, transpuesta en España por el artículo 22.2 de la LSSI) exige el
              consentimiento del usuario para el uso de cookies y tecnologías similares de
              rastreo, con la excepción de aquellas estrictamente necesarias para prestar el
              servicio solicitado.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              En el caso de ConciliaEx, no se requiere consentimiento por dos razones:
            </p>
            <ul className="space-y-3">
              {[
                {
                  titulo: "No usamos cookies",
                  desc: "La Directiva ePrivacy regula el uso de cookies HTTP. Al no usar ninguna cookie, la obligación de consentimiento no aplica.",
                },
                {
                  titulo: "El localStorage esencial no requiere consentimiento",
                  desc: "Los elementos de localStorage que usamos son estrictamente necesarios para prestar el servicio (sesión de usuario) o para recordar preferencias explícitamente elegidas por el usuario (tema e idioma). Bajo el principio de legitimidad por ejecución del contrato y por solicitud expresa del usuario, no se requiere un consentimiento adicional.",
                },
              ].map((item) => (
                <li key={item.titulo} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.titulo}: </span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Si tienes cualquier duda sobre el uso de tus datos o el almacenamiento local,
              puedes contactarnos en{" "}
              <a href="mailto:info@conciliaex.es" className="text-emerald-500 hover:underline">
                info@conciliaex.es
              </a>
              .
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
