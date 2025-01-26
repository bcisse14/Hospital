
import React from "react";
import { Outlet, Link } from "react-router-dom";

function Prescription() {
    return (
        <div className="prescription-wrapper">
            <h1>Gestion des prescriptions</h1>
            <nav>
                <Link to="list" className="prescription-link">Liste des prescriptions</Link>
                <Link to="add" className="prescription-link">Ajouter une prescription</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default Prescription;
