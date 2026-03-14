import { NavLink } from 'react-router'

function Header() {
  return (
    <header>
      <h1>Catálogo VOD</h1>

      <nav>
        <NavLink to="/">Inicio</NavLink> |{' '}
        <NavLink to="/favorites">Favoritos</NavLink> |{' '}
        <NavLink to="/contact">Contacto</NavLink> |{' '}
        <NavLink to="/legal">Aviso legal</NavLink> |{' '}
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  )
}

export default Header