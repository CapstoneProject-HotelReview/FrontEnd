import React, { useState, useEffect } from "react";
import { getReviews } from "../../api/review";

export default function ReviewCard({ userId, token }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getUserReviews() {
      if (!token || !userInfo?.id) return;
      try {
        const data = await getReviews(userId, page, token);
        setReviews(data);
      } catch (error) {
        console.error("Error loading users reviews: ", error);
      }
    }
    getUserReviews();
  }, [userInfo?.id, page, token]);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
