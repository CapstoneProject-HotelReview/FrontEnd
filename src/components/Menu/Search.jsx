import { useSearchParams } from "react-router-dom";


export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

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
    </main>
  );
}