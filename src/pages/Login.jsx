import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1 className="login-title">Log in to your account</h1>
      <form className="login-card" action={onLogin}>
        <label className="login-username">
          Username
          <input type="username" name="username" required />
        </label>
        <label className="login-password">
          Password
          <input type="password" name="password" required />
        </label>
        <button className="login-btn">Login</button>
        {error && <output>{error}</output>}
      </form>
      <Link className="register-link" to="/register">
        Need an account? Register here.
      </Link>
    </>
  );
}
