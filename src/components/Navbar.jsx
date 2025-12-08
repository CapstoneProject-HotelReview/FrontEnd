import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  
  return (
    <header id="navbar">
       {/* Brand goes to home */}
      <NavLink id="brand" to="/">
        <p>GlobeStay</p>
      </NavLink>


      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/login">
          Login
        </NavLink>

        <NavLink to="/register">
          Register
        </NavLink>

        <NavLink to="/userInfo">
          Profile
        </NavLink>

        <NavLink to="/review">
          Reviews
        </NavLink>

        {token && (
          <button type="button" onClick={logout}>
            Log out
          </button>
        )}
      </nav>
    </header>
  );
}