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
  return <div className="hotels-card"></div>;
}
