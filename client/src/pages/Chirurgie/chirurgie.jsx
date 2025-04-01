import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/hospitalisation.css";

function Chirurgie() {
  return (
    <div className="chirurgie-wrapper">
      <h1>Gestion des Chirurgies</h1>
      <nav>
        <Link to="list" className="chirurgie-link">Liste des Chirurgies</Link>
        <Link to="add" className="chirurgie-link">Ajouter une Chirurgie</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Chirurgie;