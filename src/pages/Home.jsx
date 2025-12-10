import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);


  useEffect(() => {
    async function fetchHotels() {
      const res = await fetch(import.meta.env.VITE_API + "/hotels");
      const data = await res.json();
      setHotels(data);
    }
    fetchHotels();
  }, []);

  const sortedHotels = [...hotels].sort((a, b) => {
    if (!selectedFilter) return 0;

    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);

    switch (selectedFilter) {
      case "NAME_ASC": {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }
      case "NAME_DESC": {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      }
      case "PRICE_ASC":
        return priceA - priceB;
      case "PRICE_DESC":
        return priceB - priceA;
      default:
        return 0;
    }
  });


  return (
    <div className="home-container">
      <div className="home-header">
        {/* Filter button on the right side of the top area */}
        <Filter
          selectedOption={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>


      {sortedHotels.map((hotel) => (
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
