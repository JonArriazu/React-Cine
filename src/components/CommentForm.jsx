import { useState } from 'react'

function CommentForm({ onAddComment }) {
  const [comment, setComment] = useState('')
  const [formError, setFormError] = useState('')

  const MAX_LENGTH = 300

  const validateComment = () => {
    const cleanComment = comment.trim()

    if (!cleanComment) {
      return 'El comentario no puede estar vacío.'
    }

    if (cleanComment.length < 3) {
      return 'El comentario debe tener al menos 3 caracteres.'
    }

    if (cleanComment.length > MAX_LENGTH) {
      return `El comentario no puede superar los ${MAX_LENGTH} caracteres.`
    }

    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const error = validateComment()

    if (error) {
      setFormError(error)
      return
    }

    onAddComment(comment.trim())
    setComment('')
    setFormError('')
  }

  const handleChange = (event) => {
    setComment(event.target.value)

    if (formError) {
      setFormError('')
    }
  }

  const cleanLength = comment.trim().length

  const isDisabled =
    cleanLength === 0 ||
    cleanLength < 3 ||
    cleanLength > MAX_LENGTH

  return (
    <form onSubmit={handleSubmit} className="comment-form" noValidate>
      <h3>Añadir comentario</h3>

      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Escribe tu comentario"
        rows="4"
        maxLength={MAX_LENGTH}
      />

      {/* contador */}
      <p className="char-count">
        {cleanLength} / {MAX_LENGTH}
      </p>

      {/* error */}
      {formError && <p className="form-error">{formError}</p>}

      <button type="submit" disabled={isDisabled}>
        Publicar comentario
      </button>
    </form>
  )
}

export default CommentForm