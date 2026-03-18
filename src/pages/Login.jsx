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

  const validateForm = () => {
    const cleanEmail = email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!cleanEmail) {
      return 'Debes introducir un correo electrónico.'
    }

    if (!emailRegex.test(cleanEmail)) {
      return 'Introduce un correo electrónico válido.'
    }

    if (!password.trim()) {
      return 'Debes introducir una contraseña.'
    }

    if (password.trim().length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.'
    }

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword)
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword)
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    if (error) {
      setError('')
    }
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    if (error) {
      setError('')
    }
  }

  const isSubmitDisabled =
    loading || !email.trim() || !password.trim()

  return (
    <section className="login-page">
      <h2>{isRegisterMode ? 'Registro' : 'Iniciar sesión'}</h2>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="ejemplo@correo.com"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Mínimo 6 caracteres"
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={isSubmitDisabled}>
          {loading
            ? 'Procesando...'
            : isRegisterMode
            ? 'Crear cuenta'
            : 'Entrar'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setIsRegisterMode(!isRegisterMode)
          setError('')
        }}
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