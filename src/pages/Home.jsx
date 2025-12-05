import { useState, useEffect } from "react";
import { Link } from "react-router";


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
        <link key={hotel.id} to={`/hotels/${hotel.id}`} className="hotel">
          <h3>{hotel.name}</h3>
        </link>
      ))}
    </div>
  );
}
