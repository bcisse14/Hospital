
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/hospitalisation.css";


function Hospitalisations() {
  return (
    <div className="hospitalisation-wrapper">
      <h1>Gestion des hospitalisations</h1>
      <nav>
        <Link to="list" className="consultation-link">Liste des hospitalisations</Link>
        <Link to="add" className="consultation-link">Ajouter une hospitalisation</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Hospitalisations;
