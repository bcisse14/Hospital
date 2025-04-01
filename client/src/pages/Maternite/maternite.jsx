
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/hospitalisation.css";


function Maternite() {
  return (
    <div className="maternite-wrapper">
      <h1>Gestion de la maternité</h1>
      <nav>
        <Link to="list" className="maternite-link">Liste des accouchements</Link>
        <Link to="add" className="maternite-link">Ajouter un accouchement</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Maternite;
