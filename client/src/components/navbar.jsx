import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/patients" className="navbar-link">
              Patients
            </Link>
            <Link to="/medecins" className="navbar-link">
              Médecins
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Se Déconnecter
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="navbar-link">
              Connexion
            </Link>
            <Link to="/signup" className="navbar-link">
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
