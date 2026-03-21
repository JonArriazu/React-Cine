import { NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Header({ theme, toggleTheme }) {
  const { user, logout } = useAuth()

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-logo">
            <span>🎬</span>
          </div>

          <div className="brand-text">
            <h1>Catálogo VOD</h1>
          </div>
        </div>

        <nav className="main-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Inicio
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Favoritos
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Contacto
          </NavLink>

          <NavLink
            to="/legal"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Aviso legal
          </NavLink>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Cambiar a modo claro'
                : 'Cambiar a modo oscuro'
            }
            title={
              theme === 'dark'
                ? 'Cambiar a modo claro'
                : 'Cambiar a modo oscuro'
            }
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Login
            </NavLink>
          ) : (
            <>
              <span>{user.email}</span>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header