import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'El correo no es válido.'
      case 'auth/email-already-in-use':
        return 'Ese correo ya está registrado.'
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.'
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Correo o contraseña incorrectos.'
      default:
        return 'Ha ocurrido un error. Inténtalo de nuevo.'
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }

      setEmail('')
      setPassword('')
      navigate('/')
    } catch (error) {
      setError(getErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login-page">
      <h2>{isRegisterMode ? 'Registro' : 'Iniciar sesión'}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength="6"
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? 'Procesando...'
            : isRegisterMode
            ? 'Crear cuenta'
            : 'Entrar'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsRegisterMode(!isRegisterMode)}
        className="auth-switch"
      >
        {isRegisterMode
          ? 'Ya tengo cuenta'
          : 'No tengo cuenta, quiero registrarme'}
      </button>
    </section>
  )
}

export default Login