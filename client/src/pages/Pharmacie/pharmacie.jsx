
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/unified.css";


function Pharmacie() {
  return (
    <div className="pharmacie-wrapper">
      <h1>Gestion de la Pharmacie</h1>
      <nav>
        <Link to="list" className="pharmacie-link">Liste des Médicaments</Link>
        <Link to="add" className="pharmacie-link">Ajouter un Médicament</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Pharmacie;
