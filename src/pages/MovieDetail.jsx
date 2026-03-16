import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { movies } from '../data/movies'
import { useAuth } from '../context/AuthContext'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import Rating from '../components/Rating'

function MovieDetail() {
  const { id } = useParams()
  const movieId = Number(id)
  const { user } = useAuth()

  const movie = movies.find((movie) => movie.id === movieId)

  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState([])

  const loadFavoriteState = async () => {
    if (!user) {
      setIsFavorite(false)
      return
    }

    const favoritesRef = doc(db, 'favorites', user.uid)
    const favoritesSnap = await getDoc(favoritesRef)

    const ids = favoritesSnap.exists() ? favoritesSnap.data().movieIds || [] : []
    setIsFavorite(ids.includes(movieId))
  }

  const loadComments = async () => {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('movieId', '==', movieId)
    )

    const commentsSnapshot = await getDocs(commentsQuery)

    const commentsData = commentsSnapshot.docs
      .map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }))
      .sort((a, b) => {
        const aTime = a.createdAt?.seconds ?? 0
        const bTime = b.createdAt?.seconds ?? 0
        return bTime - aTime
      })

    setComments(commentsData)
  }

  useEffect(() => {
    loadFavoriteState()
  }, [user, movieId])

  useEffect(() => {
    loadComments()
  }, [movieId])

  const handleFavoriteToggle = async () => {
    if (!user) return

    const favoritesRef = doc(db, 'favorites', user.uid)
    const favoritesSnap = await getDoc(favoritesRef)

    const ids = favoritesSnap.exists() ? favoritesSnap.data().movieIds || [] : []

    const updatedIds = ids.includes(movieId)
      ? ids.filter((id) => id !== movieId)
      : [...ids, movieId]

    await setDoc(favoritesRef, {
      movieIds: updatedIds,
    })

    setIsFavorite(updatedIds.includes(movieId))
  }

  const handleAddComment = async (newComment) => {
    if (!user) return

    await addDoc(collection(db, 'comments'), {
      movieId,
      userId: user.uid,
      userEmail: user.email,
      text: newComment,
      createdAt: serverTimestamp(),
    })

    await loadComments()
  }

  if (!movie) {
    return <h2>Película no encontrada</h2>
  }

  return (
    <section className="movie-detail">
      <h2>{movie.title}</h2>

      <img
        src={movie.image}
        alt={movie.title}
        className="movie-detail-poster"
      />

      {user ? (
        <button onClick={handleFavoriteToggle}>
          {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </button>
      ) : (
        <p>Inicia sesión para añadir esta película a favoritos.</p>
      )}

      <p><strong>Categoría:</strong> {movie.category}</p>
      <p><strong>Año:</strong> {movie.year}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Duración:</strong> {movie.duration} minutos</p>
      <p><strong>Descripción:</strong> {movie.description}</p>

      <Rating movieId={movieId} />

      {user ? (
        <CommentForm onAddComment={handleAddComment} />
      ) : (
        <p>Inicia sesión para comentar esta película.</p>
      )}

      <CommentList comments={comments} />
    </section>
  )
}

export default MovieDetail