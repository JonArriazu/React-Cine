function Contact() {
  return (
    <section className="static-page">
      <div className="static-page-header">
        <p className="static-page-tag">Zinema Aretoa</p>
        <h1>Contacto</h1>

        <div className="static-page-divider"></div>

        <p className="static-page-intro">
          ¿Tienes dudas, sugerencias o has encontrado algún problema en la web?
          Puedes ponerte en contacto con nosotros a través de los siguientes
          medios.
        </p>
      </div>

      <div className="static-page-panel">
        <div className="static-section">
          <h2>Información de contacto</h2>

          <div className="info-grid">
            <div className="info-card">
              <span className="info-label">Proyecto</span>
              <p>Zinema Aretoa</p>
            </div>

            <div className="info-card">
              <span className="info-label">Email</span>
              <p>kontaktua@zinemaaretoa.eus</p>
            </div>

            <div className="info-card">
              <span className="info-label">Horario</span>
              <p>Lunes a viernes, de 9:00 a 18:00</p>
            </div>
          </div>
        </div>

        <div className="section-line"></div>

        <div className="static-section">
          <h2>¿Sobre qué puedes escribirnos?</h2>

          <ul className="styled-list">
            <li>Errores en el funcionamiento de la aplicación</li>
            <li>Sugerencias de mejora</li>
            <li>Dudas sobre el catálogo o el uso de la web</li>
            <li>Consultas generales sobre el proyecto</li>
          </ul>
        </div>

        <div className="section-line"></div>

        <div className="static-section">
          <h2>Finalidad de esta página</h2>

          <p>
            Esta web forma parte de un proyecto formativo de desarrollo
            frontend con React. Su objetivo es practicar la creación de una
            aplicación web con navegación, catálogo de películas, sistema de
            favoritos, valoraciones y otras funcionalidades relacionadas con la
            gestión de contenido audiovisual.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;