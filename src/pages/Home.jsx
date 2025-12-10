import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Home() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    async function fetchHotels() {
      const res = await fetch(import.meta.env.VITE_API + "/hotels");
      const data = await res.json();
      setHotels(data);
    }
    fetchHotels();
  }, []);
  return (
    <div>
      {hotels.map((hotel) => (
        <div key={hotel.id} className="hotels-card">
          <div className="hotel-top">
            <img
              className="hotel-image-home"
              src={hotel.image}
              alt={hotel.name}
            />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <p>${hotel.price}</p>
            </div>
          </div>

          <Link key={hotel.id} to={`/reviews/${hotel.id}`} className="hotel">
            <button className="review-btn"> Review hotel</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
