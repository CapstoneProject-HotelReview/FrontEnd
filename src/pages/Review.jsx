import { useState } from "react";

export default function review() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const tryAddReview = async () => {
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
      <div className="public-reviews">
        <div className="reviews-title">
          <h3>Reviews</h3>
        </div>

        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r, index) => (
          <div key={index}>
            <h4>{r.subject}</h4>
            <p>{r.text}</p>
            <p>Rating:{r.rating}/5</p>
          </div>
        ))}
      </div>

      <div className="makeareview">
        <div className="rate-btn">
          <h3>Rate this hotel.</h3>
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
