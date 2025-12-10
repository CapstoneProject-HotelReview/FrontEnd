import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../../css/hamburger-test.css";


export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();

    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    closeMenu();
  }


return (
    <>
      <header id="navbar">
        {/* Hamburger button */}
        <button
          type="button"
          className={`hamburger-button ${isMenuOpen ? "is-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Brand */}
        <NavLink id="brand" to="/" onClick={closeMenu}>
          <p>GlobeStay</p>
        </NavLink>
      </header>

      {/* Slide-out side menu */}
      <aside className={`side-menu ${isMenuOpen ? "side-menu--open" : ""}`}>
        <nav>
          {/* Search bar at the top of the menu */}
          <form className="menu-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <NavLink to="/login" onClick={closeMenu}>
            Login / Register
          </NavLink>

          <NavLink to="/userInfo" onClick={closeMenu}>
            Profile
          </NavLink>

          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          {token && (
            <button
              type="button"
              className="menu-logout"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Log out
            </button>
          )}
        </nav>
      </aside>
    </>
  );
}