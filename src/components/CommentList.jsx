function CommentList({ comments }) {
  return (
    <section>
      <h3>Comentarios</h3>

      {comments.length === 0 ? (
        <p>No hay comentarios todavía.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CommentList