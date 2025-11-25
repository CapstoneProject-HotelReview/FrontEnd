import { useState, useEffect } from "react";

export default function review() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const tryAddReview = async () => {
    setError(null);
    try {
      alert("Your review was successfully submitted!");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((r, index) => (
        <div key={index} className="public-reviews">
          <h4>{r.subject}</h4>
          <p>{r.text}</p>
        </div>
      ))}
      <h3>Make a Review</h3>
      <input
        type="text"
        id="subject"
        placeholder="Tell us what your review is about!"
        className="subject_line"
      />
      <input type="text" id="text-box" className="review-textbox" />
      <button id="submit" className="submit-btn">
        submit
      </button>
    </div>
  );
}
