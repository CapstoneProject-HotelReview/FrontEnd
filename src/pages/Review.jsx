import { useState } from "react";

export default function review() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const tryAddReview = async () => {
    setError(null);
    try {
      const newReview = {
        subject: subject,
        text: text,
      };
      setReviews([...reviews, newReview]);

      setSubject("");
      setText("");

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
          </div>
        ))}
      </div>

      <div className="makeareview">
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
