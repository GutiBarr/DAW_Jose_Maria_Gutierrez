import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function Privacidad() {
  return (
    <>
      <Header variant="landing" />

      <main className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <div className="py-20 bg-muted/30 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Política de Privacidad
            </h1>
            <p className="text-sm text-muted-foreground">
              Última actualización: mayo de 2025
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 space-y-12">

          {/* 1. Responsable */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              1. Responsable del tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              El responsable del tratamiento de los datos personales recogidos a través de esta
              plataforma es <strong className="text-foreground">ConciliaEx</strong>, proyecto
              educativo desarrollado en el marco del Ciclo Formativo de Grado Superior en
              Desarrollo de Aplicaciones Web (DAW) del{" "}
              <strong className="text-foreground">IES Albarregas</strong>, situado en Mérida
              (Extremadura).
            </p>
            <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border space-y-1.5">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Centro:</span> IES Albarregas, Mérida (Badajoz)
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Contacto:</span>{" "}
                <a href="mailto:info@conciliaex.es" className="text-emerald-500 hover:underline">
                  info@conciliaex.es
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Naturaleza:</span> Proyecto educativo
                sin fines comerciales
              </p>
            </div>
          </section>

          {/* 2. Datos que recogemos */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              2. Datos que recogemos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Recogemos únicamente los datos necesarios para ofrecer la funcionalidad de la
              plataforma. Dependiendo del tipo de cuenta, estos datos son:
            </p>

            <h3 className="text-base font-semibold text-foreground mb-2">
              Para todos los usuarios
            </h3>
            <ul className="space-y-2 mb-6">
              {[
                "Nombre completo",
                "Dirección de correo electrónico",
                "Rol en la plataforma (familia o entidad)",
                "Contraseña (almacenada de forma cifrada, nunca en texto plano)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-semibold text-foreground mb-2">
              Adicionalmente, para entidades
            </h3>
            <ul className="space-y-2 mb-6">
              {[
                "Nombre de la entidad o empresa",
                "CIF / NIF de la entidad",
                "Nombre de la persona de contacto",
                "Teléfono de contacto",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-semibold text-foreground mb-2">
              Datos generados por el uso de la plataforma
            </h3>
            <ul className="space-y-2">
              {[
                "Servicios publicados por las entidades (categoría, descripción, precio, disponibilidad)",
                "Solicitudes de servicio enviadas por las familias",
                "Mensajes o comunicaciones dentro de la plataforma",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Finalidad y base legal */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              3. Finalidad y base legal del tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los datos recogidos se utilizan exclusivamente para las siguientes finalidades:
            </p>
            <ul className="space-y-3">
              {[
                {
                  titulo: "Prestación del servicio",
                  desc: "Permitir el registro, acceso y uso de la plataforma, incluyendo la publicación de servicios y el envío de solicitudes.",
                },
                {
                  titulo: "Comunicación entre partes",
                  desc: "Facilitar el contacto entre familias y entidades dentro del entorno controlado de la plataforma.",
                },
                {
                  titulo: "Gestión de cuentas",
                  desc: "Administrar el perfil del usuario, sus preferencias y su actividad dentro de la plataforma.",
                },
                {
                  titulo: "Seguridad",
                  desc: "Detectar usos indebidos o fraudulentos de la plataforma y garantizar la integridad del servicio.",
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
              La base legal del tratamiento es el <strong className="text-foreground">consentimiento
              del usuario</strong> otorgado en el momento del registro, así como la ejecución de
              la relación contractual derivada del uso de la plataforma (artículo 6.1.a y 6.1.b
              del RGPD).
            </p>
          </section>

          {/* 4. Almacenamiento y seguridad */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              4. Almacenamiento y seguridad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los datos se almacenan en los servidores de{" "}
              <strong className="text-foreground">Supabase</strong>, proveedor de base de datos
              e infraestructura cloud con servidores ubicados en la{" "}
              <strong className="text-foreground">Unión Europea</strong>. Supabase cumple con el
              Reglamento General de Protección de Datos (RGPD) y con los estándares de seguridad
              aplicables.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Adicionalmente, la plataforma utiliza el{" "}
              <strong className="text-foreground">localStorage</strong> del navegador del usuario
              para almacenar ciertos datos de sesión y preferencias de forma local. Esta información
              nunca abandona el dispositivo del usuario y no es accesible por terceros. Para más
              detalle sobre el uso del localStorage, consulta nuestra{" "}
              <a href="/legal/cookies" className="text-emerald-500 hover:underline">
                Política de Cookies y Almacenamiento Local
              </a>
              .
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Las contraseñas se almacenan con hash criptográfico y nunca son accesibles en texto
              plano, ni siquiera para el equipo administrador de la plataforma.
            </p>
          </section>

          {/* 5. Plazo de conservación */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              5. Plazo de conservación
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los datos personales se conservarán mientras la cuenta del usuario permanezca activa
              en la plataforma. Una vez que el usuario solicite la eliminación de su cuenta, sus
              datos serán suprimidos en un plazo máximo de{" "}
              <strong className="text-foreground">30 días naturales</strong>, salvo que exista
              una obligación legal que exija su conservación durante un período mayor.
            </p>
          </section>

          {/* 6. Derechos del usuario */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              6. Derechos del usuario
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              De acuerdo con el RGPD (Reglamento UE 2016/679) y la Ley Orgánica 3/2018 de
              Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD),
              tienes derecho a:
            </p>
            <ul className="space-y-3">
              {[
                {
                  derecho: "Acceso",
                  desc: "Conocer qué datos personales tuyos tratamos y obtener una copia de los mismos.",
                },
                {
                  derecho: "Rectificación",
                  desc: "Corregir datos inexactos o incompletos que tengamos sobre ti.",
                },
                {
                  derecho: "Supresión (derecho al olvido)",
                  desc: "Solicitar la eliminación de tus datos cuando ya no sean necesarios para la finalidad para la que fueron recogidos.",
                },
                {
                  derecho: "Portabilidad",
                  desc: "Recibir tus datos en un formato estructurado y de uso común para transmitirlos a otro responsable.",
                },
                {
                  derecho: "Limitación del tratamiento",
                  desc: "Solicitar que suspendamos el tratamiento de tus datos en determinadas circunstancias.",
                },
                {
                  derecho: "Oposición",
                  desc: "Oponerte al tratamiento de tus datos cuando este se base en un interés legítimo.",
                },
              ].map((item) => (
                <li key={item.derecho} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.derecho}: </span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 7. Cómo ejercer los derechos */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              7. Cómo ejercer tus derechos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Puedes ejercer cualquiera de los derechos mencionados enviando un correo electrónico
              a{" "}
              <a href="mailto:info@conciliaex.es" className="text-emerald-500 hover:underline">
                info@conciliaex.es
              </a>{" "}
              con el asunto <em>"Ejercicio de derechos RGPD"</em>, indicando:
            </p>
            <ul className="space-y-2">
              {[
                "Tu nombre completo y dirección de correo electrónico con la que estás registrado",
                "El derecho que deseas ejercer",
                "Cualquier información adicional que consideres relevante",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Responderemos a tu solicitud en el plazo máximo de{" "}
              <strong className="text-foreground">30 días</strong>. Asimismo, si consideras que
              el tratamiento de tus datos no es adecuado, puedes presentar una reclamación ante
              la{" "}
              <strong className="text-foreground">
                Agencia Española de Protección de Datos (AEPD)
              </strong>{" "}
              en{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:underline"
              >
                www.aepd.es
              </a>
              .
            </p>
          </section>

          {/* 8. Cambios en esta política */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              8. Cambios en esta política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Esta política puede actualizarse en cualquier momento para reflejar cambios en la
              plataforma o en la normativa aplicable. Cuando se realicen cambios significativos,
              lo notificaremos a los usuarios mediante un aviso en la plataforma o por correo
              electrónico. La fecha de la última actualización figura siempre en la cabecera de
              esta página.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
