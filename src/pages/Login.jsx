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
        <label className="log-label">
          Username:
          <input
            className="login-username"
            type="username"
            name="username"
            required
          />
        </label>
        <label className="log-label">
          Password:
          <input
            className="login-password"
            type="password"
            name="password"
            required
          />
        </label>
        <button className="login-btn">Login</button>
        {error && <output className="loginErrMsg">{error}</output>}
      </form>
      <Link className="register-link" to="/register">
        Need an account? Register here.
      </Link>
    </>
  );
}
