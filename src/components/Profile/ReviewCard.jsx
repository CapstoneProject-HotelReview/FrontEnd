import React, { useState, useEffect } from "react";
import { getReviews } from "../../api/review";

export default function ReviewCard({ userInfo, token }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  // TODO: Set up loading and error useState

  useEffect(() => {
    async function getUserReviews() {
      if (!token || !userInfo?.id) return;
      try {
        const data = await getReviews(userInfo?.id, page, token);
        setReviews(data);
      } catch (error) {
        console.error("Error loading users reviews: ", error);
      }
    }
    getUserReviews();
  }, [userInfo?.id, page, token]);

  const handlePreviousPageBtn = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPageBtn = () => {
    setPage(page + 1);
  };
  /**************************************/
  console.log("User Reviews: ", reviews);
  //TODO: Set up loading, error, no reviews handler (like if statement below)
  // if (reviews.length === 0) return <p>No Reviews Yet</p>;

  return (
    <div className="reviewCardContainer">
      <h2>Reviews</h2>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h3>{review.subject}</h3>
            <p>{review.review}</p>
            <p className="reviewDate">{new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="reviewPageBtns">
        <button onClick={handlePreviousPageBtn} disabled={page === 1}>
          ←
        </button>
        <button onClick={handleNextPageBtn}>→</button>
      </div>
    </div>
  );
}
