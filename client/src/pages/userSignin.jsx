import React, { useState, useContext } from "react";
import { getUsers } from "../api/userService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../assets/form.css";
import "../assets/home.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = await getUsers();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        console.log("User signed in successfully:", user);
        login(user, rememberMe); // Utilisez la méthode du contexte
        navigate("/"); // Redirige vers la page d'accueil
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
