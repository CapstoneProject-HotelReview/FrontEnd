import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";


export default function Navbar() {
  const { token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
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
          {/* Search button (placeholder for now) */}
          <button
            type="button"
            className="menu-search"
            onClick={closeMenu}
          >
            Search
          </button>

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