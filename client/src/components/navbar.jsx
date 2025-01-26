import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Réinitialiser le menu lorsque la fenêtre dépasse 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <button className="menu-burger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <>
            <Link to="/prescriptions" className="navbar-link">
              Prescriptions
            </Link>
            <Link to="/urgence" className="navbar-link">
              Urgences
            </Link>
            <Link to="/pharmacie" className="navbar-link">
              Pharmacie
            </Link>
            <Link to="/rendezvous" className="navbar-link">
              Rendez-vous
            </Link>
            <Link to="/hospitalisations" className="navbar-link">
              Hospitalisations
            </Link>
            <Link to="/consultations" className="navbar-link">
              Consultations
            </Link>
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
