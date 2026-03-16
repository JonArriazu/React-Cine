import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'

function Rating({ movieId }) {
  const { user } = useAuth()

  const [averageRating, setAverageRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [loading, setLoading] = useState(false)

  const loadRatings = async () => {
    const ratingsQuery = query(
      collection(db, 'ratings'),
      where('movieId', '==', movieId)
    )

    const ratingsSnapshot = await getDocs(ratingsQuery)
    const values = ratingsSnapshot.docs.map((ratingDoc) => ratingDoc.data().value)

    const total = values.reduce((sum, value) => sum + value, 0)
    const average = values.length > 0 ? total / values.length : 0

    setAverageRating(average)
    setRatingCount(values.length)

    if (user) {
      const userRatingRef = doc(db, 'ratings', `${user.uid}_${movieId}`)
      const userRatingSnap = await getDoc(userRatingRef)

      setUserRating(userRatingSnap.exists() ? userRatingSnap.data().value : 0)
    } else {
      setUserRating(0)
    }
  }

  useEffect(() => {
    loadRatings()
  }, [movieId, user])

  const handleRate = async (value) => {
    if (!user) return

    setLoading(true)

    await setDoc(doc(db, 'ratings', `${user.uid}_${movieId}`), {
      movieId,
      userId: user.uid,
      value,
      updatedAt: serverTimestamp(),
    })

    await loadRatings()
    setLoading(false)
  }

  return (
    <section className="rating-section">
      <h3>Valoración</h3>

      <p>
        Media: {ratingCount > 0 ? averageRating.toFixed(1) : 'Sin votos'} 
        {ratingCount > 0 ? ` (${ratingCount} votos)` : ''}
      </p>

      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRate(value)}
            disabled={!user || loading}
            className={userRating === value ? 'active' : ''}
          >
            {value}★
          </button>
        ))}
      </div>

      {!user && (
        <p className="auth-required">
          Inicia sesión para puntuar esta película.
        </p>
      )}
    </section>
  )
}

export default Rating