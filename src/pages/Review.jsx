import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router-dom";
import { getHotelById } from "../api/hotel";
import { getReviews } from "../api/review";
import { getUserInfo } from "../api/user";

export default function Review() {
  const [userInfo, setUserInfo] = useState(null);
  const { id: hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState(0);
  const { token } = useAuth();
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    async function fetchHotel() {
      const h = await getHotelById(hotelId, token);
      const data = await getUserInfo(token);
      const allReviews = await getReviews(userInfo?.id, page, token);
      setReviews(allReviews);
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

  // const tryAddReview = async () => {
  //   if (!isLoggedIn) {
  //     alert("You must be logged in to review this hotel");
  //     return;
  //   }
  //   setError(null);
  //   try {
  //     const newReview = {
  //       subject: subject,
  //       text: text,
  //       rating: rating,
  //     };
  //     setReviews([...reviews, newReview]);
  //     setSubject("");
  //     setText("");
  //     setRating(0);
  //     alert("Your review was successfully submitted!");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  // const onAddReview = async (formData) => {
  //   const subject_line = formData.get("subject-line");
  //   const review_textbox = formData.get("review-textbox");
  //   console.log(subject_line, review_textbox);
  // };

  const onAddReview = async (formData) => {
    if (!isLoggedIn) return alert("You must be logged in to review this hotel");
    if (rating === 0) return alert("Please select a rating");

    const subject_line = formData.get("subject-line");
    const review_textbox = formData.get("review-textbox");
    console.log(subject_line, review_textbox);
    
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
      <div className="reviews-card">
        <article className="title-card">
          {hotel ? (
            <>
              <div className="left-side">
                <img className="hotel-image" src={hotel.image} alt={hotel.name} />
              </div>
              <article className="right-side">
                <h2>{hotel.name}</h2>
                <p>{hotel.description}</p>
                <h3 className="hotel-price">{hotel.price}</h3>
              </article>
            </>
          ) : (
            <p>Loading hotel...</p>
          )}
        </article>
        <div className="public-reviews">
          <div className="reviews-title">
            <h3>Reviews</h3>
          </div>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r, index) => (
            <div key={index}>
              <h4>{r.subject}</h4>
              <p>{r.text}</p>
              <p>{":earth_americas:".repeat(r.rating)}</p>
            </div>
          ))}
        </div>
        {isLoggedIn && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddReview(new FormData(e.target));
              // tryAddReview();
            }}
          >
            <div className="makeareview">
              <div className="rate-btn">
                <h4 className="rt-hotel">Rate this hotel</h4>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span className="globe" key={value} onClick={() => handleRating(value)}>
                    {value <= rating ? ":earth_africa:" : ":earth_americas:"}
                  </span>
                ))}
              </div>
              <div className="review-input">
                <input
                  type="text"
                  id="subject"
                  name="subject-line"
                  placeholder="Title your review"
                  className="subject_line"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <input
                  type="text"
                  id="text-box"
                  name="review-textbox"
                  className="review-textbox"
                  placeholder="Write your review here."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button id="submit" className="submit-btn">
                  submit
                </button>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </form>
        )}
      </div>
    </>
  );
}
