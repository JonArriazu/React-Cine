import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-left">
          <h3>Zinema Aretoa</h3>
          <p>Catálogo de cine para descubrir y valorar películas.</p>
        </div>

        <div className="footer-links">
          <Link to="/contact">Contacto</Link>
          <Link to="/legal">Aviso legal</Link>
        </div>

        <div className="footer-right">
          <p>© {new Date().getFullYear()} Zinema Aretoa</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;