import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedName = name.trim();

    if (!normalizedName || !password.trim() || !repeatedPassword.trim()) {
      setError("Please complete all fields.");
      return;
    }

    if (normalizedName.length > 10) {
      setError("Name must be 10 characters or fewer.");
      return;
    }

    if (password.length < 3 || password.length > 12) {
      setError("Password must be between 3 and 12 characters.");
      return;
    }

    if (password !== repeatedPassword) {
      setError("Passwords do not match.");
      return;
    }

    login({ name: normalizedName });
    const destination = location.state?.from?.pathname || "/";
    navigate(destination, { replace: true });
  };

  return (
    <main className="login">
      <section className="login__card" aria-labelledby="login-title">
        <p className="login__brand">Unsplash Clone</p>
        <h1 id="login-title" className="login__title">
          Welcome back
        </h1>
        <p className="login__subtitle">Sign in to explore the photo gallery.</p>

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <label className="login__field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              placeholder="Your name"
              maxLength={10}
              required
            />
          </label>

          <label className="login__field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Password"
              minLength={3}
              maxLength={12}
              required
            />
          </label>

          <label className="login__field">
            <span>Repeat password</span>
            <input
              type="password"
              value={repeatedPassword}
              onChange={(event) => setRepeatedPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Repeat password"
              minLength={3}
              maxLength={12}
              required
            />
          </label>

          {error && (
            <p className="login__error" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="login__submit">
            Login
          </Button>
        </form>

        <p className="login__notice">
          Demo login: any non-empty credentials will work.
        </p>
      </section>
    </main>
  );
};

export default Login
