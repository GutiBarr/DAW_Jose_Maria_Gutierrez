import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function Terminos() {
  return (
    <>
      <Header variant="landing" />

      <main className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <div className="py-20 bg-muted/30 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Términos de Uso
            </h1>
            <p className="text-sm text-muted-foreground">
              Última actualización: mayo de 2025
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 space-y-12">

          <p className="text-muted-foreground leading-relaxed -mt-4">
            El uso de ConciliaEx implica la aceptación de los presentes Términos de Uso. Te
            rogamos que los leas detenidamente antes de registrarte o hacer uso de la plataforma.
          </p>

          {/* 1. Descripción */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              1. Descripción del servicio
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">ConciliaEx</strong> es una plataforma digital
              de carácter educativo cuyo objetivo es conectar a{" "}
              <strong className="text-foreground">familias con personas dependientes</strong> con{" "}
              <strong className="text-foreground">entidades especializadas en servicios de
              dependencia</strong> en la Comunidad Autónoma de Extremadura. La plataforma permite
              a las familias consultar servicios disponibles y enviar solicitudes, mientras que
              las entidades pueden publicar y gestionar su oferta de servicios.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              ConciliaEx es un proyecto educativo desarrollado en el marco del Ciclo Formativo
              de Grado Superior en Desarrollo de Aplicaciones Web (DAW) del IES Albarregas
              (Mérida). No tiene finalidad comercial y no garantiza la disponibilidad permanente
              del servicio.
            </p>
          </section>

          {/* 2. Condiciones de acceso */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              2. Condiciones de acceso
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Para registrarse y utilizar ConciliaEx es necesario cumplir los siguientes
              requisitos:
            </p>
            <ul className="space-y-3">
              {[
                {
                  titulo: "Mayoría de edad",
                  desc: "Ser mayor de 18 años, o actuar bajo la supervisión y con el consentimiento de un tutor legal en el caso de menores.",
                },
                {
                  titulo: "Datos verídicos",
                  desc: "Proporcionar información real y actualizada durante el proceso de registro. El uso de datos falsos o de terceros sin su consentimiento está expresamente prohibido.",
                },
                {
                  titulo: "Una cuenta por usuario",
                  desc: "Cada persona o entidad puede registrarse con una única cuenta. La creación de cuentas duplicadas o con fines fraudulentos puede dar lugar a la suspensión del acceso.",
                },
                {
                  titulo: "Uso personal e intransferible",
                  desc: "El acceso a la cuenta es personal e intransferible. El usuario es responsable de mantener la confidencialidad de sus credenciales.",
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
          </section>

          {/* 3. Obligaciones familia */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              3. Obligaciones del usuario (perfil Familia)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los usuarios registrados como familia se comprometen a:
            </p>
            <ul className="space-y-2">
              {[
                "Realizar solicitudes de servicio únicamente cuando exista un interés real y genuino en el servicio solicitado.",
                "Proporcionar información veraz sobre el estado y las necesidades de la persona dependiente.",
                "Tratar con respeto a los representantes de las entidades en cualquier comunicación dentro de la plataforma.",
                "No utilizar la plataforma para obtener información de entidades con fines distintos a la contratación o consulta de servicios.",
                "Comunicar cualquier incidencia o uso indebido detectado al equipo de ConciliaEx.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Obligaciones entidad */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              4. Obligaciones del usuario (perfil Entidad)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Las entidades registradas en la plataforma se comprometen a:
            </p>
            <ul className="space-y-2">
              {[
                "Publicar únicamente servicios reales que estén efectivamente disponibles y que la entidad pueda prestar.",
                "Mantener la información de sus servicios actualizada (disponibilidad, precio, descripción, zona de atención).",
                "Responder a las solicitudes de las familias en un plazo razonable.",
                "No utilizar la plataforma para realizar publicidad engañosa o desinformar sobre la naturaleza o calidad de sus servicios.",
                "Garantizar que los datos de la entidad (nombre, CIF, persona de contacto) son correctos y corresponden a una entidad real y legalmente constituida.",
                "Tratar los datos de las familias que contacten exclusivamente con la finalidad de gestionar el servicio solicitado.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Contenido prohibido */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              5. Contenido prohibido
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Queda expresamente prohibido en ConciliaEx:
            </p>
            <ul className="space-y-2">
              {[
                "Publicar contenido falso, engañoso, difamatorio, ofensivo o que vulnere derechos de terceros.",
                "Utilizar la plataforma para actividades ilegales o contrarias a la normativa española o europea.",
                "Intentar acceder sin autorización a cuentas ajenas o a las áreas restringidas del sistema.",
                "Realizar acciones de scraping, automatización masiva o cualquier técnica que sobrecargue o comprometa la infraestructura de la plataforma.",
                "Suplantar la identidad de otra persona, empresa o entidad.",
                "Enviar comunicaciones no solicitadas (spam) a través de los canales de la plataforma.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              El incumplimiento de estas normas podrá suponer la suspensión o eliminación de la
              cuenta sin previo aviso.
            </p>
          </section>

          {/* 6. Propiedad intelectual */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              6. Propiedad intelectual
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El diseño, el código fuente, la interfaz, los logotipos y cualquier otro elemento
              original de ConciliaEx son propiedad intelectual de su autor, desarrollados como
              proyecto educativo en el{" "}
              <strong className="text-foreground">IES Albarregas</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              El contenido publicado por los usuarios (descripciones de servicios, información de
              perfil, etc.) es responsabilidad exclusiva del usuario que lo publica. Al publicar
              contenido en ConciliaEx, el usuario garantiza que tiene los derechos necesarios
              sobre dicho contenido y otorga a la plataforma una licencia no exclusiva para
              mostrarlo a otros usuarios con la finalidad de prestar el servicio.
            </p>
          </section>

          {/* 7. Limitación de responsabilidad */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              7. Limitación de responsabilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ConciliaEx actúa como <strong className="text-foreground">intermediario</strong>{" "}
              entre familias y entidades, sin intervenir en la relación contractual que pueda
              establecerse entre ambas partes. Por tanto:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "ConciliaEx no garantiza la calidad, idoneidad ni disponibilidad real de los servicios publicados por las entidades.",
                "ConciliaEx no se responsabiliza de los acuerdos, pagos o compromisos establecidos fuera de la plataforma entre familias y entidades.",
                "Al ser un proyecto educativo, no se garantiza la disponibilidad continuada del servicio ni un nivel de servicio (SLA) determinado.",
                "ConciliaEx no se responsabiliza de los daños que pudieran derivarse de un uso incorrecto o fraudulento de la plataforma por parte de terceros.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Modificaciones */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              8. Modificaciones del servicio
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              El equipo de ConciliaEx se reserva el derecho de modificar, suspender o
              discontinuar cualquier aspecto de la plataforma en cualquier momento, con o sin
              previo aviso, especialmente en el contexto de las necesidades del proyecto
              educativo. Los cambios relevantes en los Términos de Uso serán comunicados a los
              usuarios registrados mediante aviso en la plataforma o por correo electrónico.
            </p>
          </section>

          {/* 9. Legislación aplicable */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              9. Legislación aplicable y jurisdicción
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los presentes Términos de Uso se rigen por la legislación española y, en
              particular, por la normativa de la{" "}
              <strong className="text-foreground">Comunidad Autónoma de Extremadura</strong>{" "}
              en lo que resulte aplicable. Para la resolución de cualquier controversia
              derivada del uso de la plataforma, las partes se someten a los juzgados y
              tribunales del domicilio del usuario, salvo que la normativa aplicable disponga
              otra cosa. En materia de protección de datos, será de aplicación el RGPD y la
              LOPDGDD, siendo la Agencia Española de Protección de Datos (AEPD) el organismo
              de supervisión competente.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
