<<<<<<< HEAD
export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>Placeholder home page for the navbar/router feature.</p>
    </main>
  );
}
=======
import { useState, useEffect } from "react";
import { link } from "react-router-dom";

export default function home() {
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
          <h3>{}</h3>
        </link>
      ))}
    </div>
  );
}
>>>>>>> 290075004293476b6c6881ab6279710ebac74e56
