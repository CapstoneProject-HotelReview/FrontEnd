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
    <div className="hotels-card">
      {hotels.map((hotel) => (
        <Link key={hotel.id} to={`/reviews/${hotel.id}`} className="hotel">
          <h3>{hotel.name}</h3>
          <p>{hotel.description}</p>
          <p>${hotel.price}</p>
          <img
            className="hotel-image-home"
            src={hotel.image}
            alt={hotel.name}
          />
        </Link>
      ))}
    </div>
  );
}
