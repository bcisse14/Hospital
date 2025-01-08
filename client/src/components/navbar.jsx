import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User from localStorage:", user);  // Log pour vérifier si user est bien récupéré
    setIsLoggedIn(!!user); // On met à jour l'état en fonction de la présence de l'utilisateur dans le localStorage
  }, []);

  const handleLogout = () => {
    console.log("Déconnexion de l'utilisateur");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // Redirige vers la page d'accueil après déconnexion
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-links">
        <Link to="/patients" className="navbar-link">
          Patients
        </Link>
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
