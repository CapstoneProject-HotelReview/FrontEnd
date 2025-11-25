import { useState } from "react";

export default function review() {
  const tryAddReview = async () => {
    setError(null);
    try {
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
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
