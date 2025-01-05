import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté (localStorage contient des informations utilisateur)
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // !!user retourne true si user existe, sinon false
  }, []);

  const handleLogout = () => {
    // Supprime les informations utilisateur du localStorage
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // Redirige l'utilisateur vers la page d'accueil
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Se Déconnecter
          </button>
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
