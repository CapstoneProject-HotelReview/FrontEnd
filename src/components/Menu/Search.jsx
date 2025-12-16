import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    async function fetchSearchResults() {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API}/hotels?search=${encodeURIComponent(query)}`
        );

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <main id="search-page">
      <h1>Search Results</h1>

      {query ? (
        <p>
          Showing results for: <strong>{query}</strong>
        </p>
      ) : (
        <p>No search term provided.</p>
      )}

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && query && (
        <p>No hotels found.</p>
      )}

      <div className="search-results">
        {results.map((hotel) => (
          <div key={hotel.id} className="hotels-card">
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
        ))}
      </div>
    </main>
  );
}