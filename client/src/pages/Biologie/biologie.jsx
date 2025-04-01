
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/hospitalisation.css";


function Biologie() {
  return (
    <div className="biologie-wrapper">
      <h1>Gestion des consultations biologiques</h1>
      <nav>
        <Link to="list" className="biologie-link">Liste des consultations biologiques</Link>
        <Link to="add" className="biologie-link">Ajouter une consultation</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Biologie;
