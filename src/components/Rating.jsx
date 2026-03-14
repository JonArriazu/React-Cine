import { useState } from "react";

function Rating({ movieId, onRatingSubmit }) {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSubmit = () => {
    if (selectedRating === 0) {
      alert("Selecciona una puntuación");
      return;
    }

    onRatingSubmit(movieId, selectedRating);
    setSelectedRating(0);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Valora esta película</h3>

      <div style={{ fontSize: "30px", marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => setSelectedRating(value)}
            style={{
              cursor: "pointer",
              color: value <= selectedRating ? "#FFD700" : "#ccc",
              marginRight: "5px",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <button onClick={handleSubmit}>
        Guardar puntuación
      </button>
    </div>
  );
}

export default Rating;