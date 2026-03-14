import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">

        <div className="brand">

          <div className="brand-logo">
            🎬
          </div>

          <div className="brand-text">
            <h1>Zinema Aretoa</h1>
          </div>

        </div>

        <nav className="main-nav">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/favorites">Favoritos</NavLink>
          <NavLink to="/contact">Contacto</NavLink>
          <NavLink to="/legal">Aviso legal</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Header;