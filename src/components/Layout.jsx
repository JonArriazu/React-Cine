import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

function Layout({ theme, toggleTheme }) {
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout