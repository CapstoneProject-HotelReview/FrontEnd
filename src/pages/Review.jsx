import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router-dom";

export default function Review() {
  const { id: hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  const { token } = useAuth();
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    fetch(`http://localhost:3000/hotels/${hotelId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hotel not found");
        }
        return res.json();
      })
      .then((data) => setHotel(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [hotelId]);

  const handleRating = (value) => {
    if (!isLoggedIn) {
      alert("You must be logged in to review this hotel");
      return;
    }
    setRating(value);
  };

  const tryAddReview = async () => {
    if (!isLoggedIn) {
      alert("You must be logged in to review this hotel");
      return;
    }
    setError(null);
    try {
      const newReview = {
        subject: subject,
        text: text,
        rating: rating,
      };
      setReviews([...reviews, newReview]);

      setSubject("");
      setText("");
      setRating(0);

      alert("Your review was successfully submitted!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="reviews-card">
      {hotel ? (
        <>
          <h2>{hotel.name}</h2>
          <p>{hotel.description}</p>
          <h3>{hotel.price}</h3>
          <img
            src={hotel.image}
            alt={hotel.name}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
        </>
      ) : (
        <p>Loading hotel...</p>
      )}
      <div className="public-reviews">
        <div className="reviews-title">
          <h3>Reviews</h3>
        </div>

        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r, index) => (
          <div key={index}>
            <h4>{r.subject}</h4>
            <p>{r.text}</p>
            <p>Rating:{r.rating}/5🌎</p>
          </div>
        ))}
      </div>

      <div className="makeareview">
        <div className="rate-btn">
          <h4>Rate this hotel.</h4>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              data-value={value}
              onClick={() => handleRating(value)}
            >
              🌎
            </span>
          ))}
        </div>
        <input
          type="text"
          id="subject"
          placeholder="Title your review"
          className="subject_line"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          id="text-box"
          className="review-textbox"
          placeholder="Write your review here."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button id="submit" className="submit-btn" onClick={tryAddReview}>
          submit
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
