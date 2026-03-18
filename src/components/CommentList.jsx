function CommentList({ comments }) {
  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return ''

    const date = new Date(timestamp.seconds * 1000)

    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <section className="comments-section">
      <h3>Comentarios</h3>

      {comments.length === 0 ? (
        <div className="empty-state">
          <p>Todavía no hay comentarios para esta película.</p>
        </div>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-card">
              <div className="comment-header">
                <strong>{comment.userEmail}</strong>

                {comment.createdAt && (
                  <span className="comment-date">
                    {formatDate(comment.createdAt)}
                  </span>
                )}
              </div>

              <p className="comment-text">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CommentList