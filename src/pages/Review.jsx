import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router-dom";
import { getHotelById } from "../api/hotel";

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
    async function fetchHotel() {
      const h = await getHotelById(hotelId, token);
      console.log("fetched hotel:", h);
      if (!hotelId) return;

      if (!h) {
        setError("Hotel not found");
      } else {
        setHotel(h);
      }
    }
    fetchHotel();
  }, [hotelId, token]);

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
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          tryAddReview();
        }}
      >
        <div className="reviews-card">
          {hotel ? (
            <>
              <h2>{hotel.name}</h2>
              <p className="hotel-description">{hotel.description}</p>
              <h3>{hotel.price}</h3>
              <img className="hotel-image" src={hotel.image} alt={hotel.name} />
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
                <span key={value} onClick={() => handleRating(value)}>
                  {value <= rating ? "🌍" : "🌎"}
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
      </form>
    </>
  );
}
