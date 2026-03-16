function CommentList({ comments }) {
  return (
    <section>
      <h3>Comentarios</h3>

      {comments.length === 0 ? (
        <p>No hay comentarios todavía.</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <strong>{comment.userEmail}</strong>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CommentList