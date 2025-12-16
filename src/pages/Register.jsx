import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await register({ firstname, lastname, username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
      /**************/
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="register-title">Register for an account</h1>
      <form className="register-card" onSubmit={onRegister}>
        <label className="reg-label">
          First Name:
          <input className="reg-name" type="text" name="firstname" required />
        </label>
        <label className="reg-label">
          Last Name:
          <input className="reg-name" type="text" name="lastname" required />
        </label>
        <label className="reg-label">
          Username:
          <input className="reg-user" type="text" name="username" required />
        </label>
        <label className="reg-label">
          Password:
          <input className="reg-password" type="password" name="password" required />
        </label>
        <button className="reg-btn" type="submit">
          Register
        </button>
        {error && <output>{error}</output>}
      </form>
      <Link className="login-link" to="/login">
        Already have an account? Log in here.
      </Link>
    </>
  );
}
