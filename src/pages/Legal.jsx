function Legal() {
  return (
    <section className="static-page">
      <div className="static-page-header">
        <p className="static-page-tag">Zinema Aretoa</p>
        <h1>Aviso legal</h1>

        <div className="static-page-divider"></div>

        <p className="static-page-intro">
          Este sitio web ha sido creado con fines educativos y formativos como
          parte de un proyecto académico de desarrollo web con React.
        </p>
      </div>

      <div className="static-page-panel">
        <div className="static-section">
          <h2>Identificación</h2>

          <div className="info-grid">
            <div className="info-card">
              <span className="info-label">Nombre del sitio</span>
              <p>Zinema Aretoa</p>
            </div>

            <div className="info-card">
              <span className="info-label">Responsable</span>
              <p>Equipo del proyecto Zinema Aretoa</p>
            </div>

            <div className="info-card">
              <span className="info-label">Contacto</span>
              <p>kontaktua@zinemaaretoa.eus</p>
            </div>
          </div>
        </div>

        <div className="section-line"></div>

        <div className="static-section">
          <h2>Finalidad del sitio web</h2>

          <p>
            La finalidad de este sitio web es mostrar un catálogo de películas y
            permitir al usuario interactuar con diferentes apartados de la
            aplicación, como favoritos, valoraciones y comentarios, dentro de
            un entorno de aprendizaje y práctica de desarrollo frontend.
          </p>
        </div>

        <div className="section-line"></div>

        <div className="static-section">
          <h2>Propiedad intelectual</h2>

          <p>
            El diseño, la estructura y el código fuente de esta aplicación
            forman parte de un proyecto académico. Las imágenes, títulos y
            referencias a películas utilizadas tienen una finalidad educativa o
            demostrativa.
          </p>
        </div>

        <div className="section-line"></div>

        <div className="static-section">
          <h2>Responsabilidad</h2>

          <p>
            No se garantiza la ausencia de errores en los contenidos ni la
            disponibilidad continua del sitio web. El equipo responsable no se
            hace cargo del uso indebido que pueda hacerse de la información
            mostrada en esta página.
          </p>
        </div>

        <div className="section-line"></div>

        <div className="static-section">
          <h2>Protección de datos</h2>

          <p>
            Esta aplicación no tiene fines comerciales. En caso de almacenar
            datos de usuario, estos se utilizarán únicamente dentro del
            funcionamiento de la aplicación y con fines relacionados con la
            práctica académica del proyecto.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Legal;