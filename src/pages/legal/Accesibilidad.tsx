import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function AccesibilidadPage() {
  return (
    <>
      <Header variant="landing" />

      <main className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <div className="py-20 bg-muted/30 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Declaración de Accesibilidad
            </h1>
            <p className="text-sm text-muted-foreground">
              Última actualización: mayo de 2025
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 space-y-12">

          {/* 1. Compromiso */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              1. Nuestro compromiso con la accesibilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              En ConciliaEx creemos que la tecnología debe ser accesible para todas las personas,
              independientemente de sus capacidades o del dispositivo que utilicen. Por ello, nos
              comprometemos a desarrollar y mantener la plataforma siguiendo las{" "}
              <strong className="text-foreground">
                Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA
              </strong>
              , elaboradas por el W3C.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Este compromiso es especialmente relevante dado el colectivo al que sirve la
              plataforma: familias cuidadoras de personas con dependencia, que pueden incluir
              personas mayores o con diversidad funcional entre sus usuarios habituales.
            </p>
          </section>

          {/* 2. Medidas implementadas */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              2. Medidas de accesibilidad implementadas
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Las siguientes medidas están actualmente implementadas en la plataforma:
            </p>

            <div className="space-y-6">

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Navegación por teclado
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Todos los elementos interactivos de la plataforma (botones, enlaces, formularios,
                  menús) son accesibles y operables mediante el teclado, sin necesidad de usar el
                  ratón. El orden de tabulación es lógico y coherente con la estructura visual de la
                  página.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Contraste de colores y modos de visualización
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  La plataforma ofrece un{" "}
                  <strong className="text-foreground">modo claro y un modo oscuro</strong>{" "}
                  seleccionables por el usuario. Ambos modos han sido diseñados para cumplir con las
                  ratios de contraste mínimas exigidas por WCAG 2.1 AA (4.5:1 para texto normal,
                  3:1 para texto grande y elementos gráficos). El selector de tema está accesible
                  desde el encabezado en todo momento.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Diseño responsive y adaptable
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  La interfaz se adapta correctamente a diferentes tamaños de pantalla: teléfonos
                  móviles, tabletas y ordenadores de escritorio. El zoom del navegador puede
                  aumentarse hasta el 200 % sin pérdida de funcionalidad ni solapamiento de
                  contenido.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Semántica HTML correcta
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  La estructura del HTML utiliza elementos semánticos apropiados:{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    &lt;main&gt;
                  </code>
                  ,{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    &lt;header&gt;
                  </code>
                  ,{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    &lt;footer&gt;
                  </code>
                  ,{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    &lt;nav&gt;
                  </code>
                  ,{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    &lt;section&gt;
                  </code>{" "}
                  y jerarquía de encabezados ordenada (h1 → h2 → h3), lo que facilita la navegación
                  a usuarios de tecnologías de asistencia.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Compatibilidad con lectores de pantalla
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Los componentes interactivos incluyen atributos ARIA donde es necesario para
                  comunicar su estado y función a los lectores de pantalla. Los mensajes de error
                  en formularios se asocian programáticamente al campo correspondiente mediante{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    aria-describedby
                  </code>
                  . La plataforma ha sido revisada para su compatibilidad con NVDA y VoiceOver.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Textos alternativos en imágenes
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Todas las imágenes informativas incluyen texto alternativo descriptivo mediante
                  el atributo{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">alt</code>.
                  Las imágenes decorativas están marcadas con{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    alt=""
                  </code>{" "}
                  para que los lectores de pantalla las omitan.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Idioma de la página declarado
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  El atributo{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">lang</code>{" "}
                  del elemento{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">&lt;html&gt;</code>{" "}
                  indica el idioma activo (español o inglés según la preferencia del usuario),
                  permitiendo que los lectores de pantalla apliquen la pronunciación correcta.
                </p>
              </div>

            </div>
          </section>

          {/* 3. Estado de conformidad */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              3. Estado de conformidad
            </h2>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <p className="text-sm font-medium text-emerald-500">
                Conformidad parcial — Proyecto en desarrollo activo
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              ConciliaEx cumple parcialmente con las WCAG 2.1 nivel AA. Al tratarse de un
              proyecto educativo en desarrollo, existen algunas áreas que aún están siendo
              revisadas y mejoradas de forma iterativa. El objetivo es alcanzar la plena
              conformidad antes de la entrega definitiva del proyecto.
            </p>
          </section>

          {/* 4. Limitaciones conocidas */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              4. Limitaciones conocidas
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Las siguientes áreas presentan limitaciones de accesibilidad que estamos trabajando
              para corregir:
            </p>
            <ul className="space-y-3">
              {[
                {
                  area: "Tablas del panel de administración",
                  desc: "Algunas tablas de datos en el panel de administración no incluyen encabezados de columna marcados correctamente con el atributo scope, lo que puede dificultar su lectura con lectores de pantalla. Está pendiente de corrección.",
                },
                {
                  area: "Mensajes de estado en tiempo real",
                  desc: "Algunos mensajes de confirmación o error que aparecen dinámicamente en pantalla aún no utilizan regiones ARIA live, por lo que pueden no ser anunciados automáticamente por lectores de pantalla.",
                },
                {
                  area: "Selectores de fecha y filtros avanzados",
                  desc: "Los componentes de filtrado de servicios con múltiples opciones pueden requerir mejoras en la etiquetación ARIA para garantizar una experiencia óptima con tecnologías de asistencia.",
                },
              ].map((item) => (
                <li key={item.area} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.area}: </span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Contacto */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              5. Contacto: cómo reportar una barrera de accesibilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Si encuentras alguna dificultad para acceder o usar cualquier parte de ConciliaEx,
              te agradecemos que nos lo hagas saber. Tu feedback es fundamental para seguir
              mejorando. Puedes contactarnos en:
            </p>
            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Email: </span>
                <a href="mailto:info@conciliaex.es" className="text-emerald-500 hover:underline">
                  info@conciliaex.es
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Asunto sugerido: </span>
                <em>"Barrera de accesibilidad — [descripción breve del problema]"</em>
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Intentaremos responder y, en su caso, resolver el problema reportado en el plazo
              más breve posible. Si no recibes respuesta en un plazo de 20 días hábiles, puedes
              dirigirte al{" "}
              <strong className="text-foreground">
                Centro de Referencia en Accesibilidad
              </strong>{" "}
              del Ministerio de Derechos Sociales, o al{" "}
              <a
                href="https://administracion.gob.es/pag_Home/atencionCiudadana/derechos-deberes-ciudadanos/reclamaciones-quejas-sugerencias.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:underline"
              >
                procedimiento de reclamación de la administración
              </a>
              .
            </p>
          </section>

          {/* 6. Fecha */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-500 mb-4">
              6. Fecha de esta declaración
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Esta declaración de accesibilidad fue elaborada en{" "}
              <strong className="text-foreground">mayo de 2025</strong> y se revisará
              periódicamente a medida que la plataforma evolucione. La metodología utilizada
              para la evaluación es una autoevaluación realizada por el equipo de desarrollo
              del proyecto, complementada con pruebas manuales con lectores de pantalla y
              herramientas automatizadas de análisis de accesibilidad.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
