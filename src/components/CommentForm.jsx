import { useState } from 'react'

function CommentForm({ onAddComment }) {
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!comment.trim()) return

    onAddComment(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Añadir comentario</h3>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Escribe tu comentario"
        rows="4"
      />

      <button type="submit">Publicar comentario</button>
    </form>
  )
}

export default CommentForm