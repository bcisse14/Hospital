import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import SignUp from "../pages/userSignup";
import Signin from "../pages/userSignin";
import Navbar from "../components/navbar";
import Patients from "../pages/Patients/patients";
import AddPatient from "../pages/Patients/addPatient";
import PatientList from "../pages/Patients/patientsList";
import EditPatient from "../pages/Patients/editPatient";
import Medecins from "../pages/Medecins/medecins";
import AddMedecin from "../pages/Medecins/addMedecin";
import MedecinList from "../pages/Medecins/medecinList";
import EditMedecin from "../pages/Medecins/editMedecin";

function Router() {
  return (
    <BrowserRouter>
  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/patients" element={<Patients />}>
          <Route path="add" element={<AddPatient />} />
          <Route path="list" element={<PatientList />} />
        </Route>
          <Route path="/patients/edit/:id" element={<EditPatient />} />
        <Route path="/medecins" element={<Medecins />}>
          <Route path="add" element={<AddMedecin />} />
         <Route path="list" element={<MedecinList />} />
        </Route>
      <Route path="/medecins/edit/:id" element={<EditMedecin />} />;
      </Routes>

    </BrowserRouter>
  );
}

export default Router;
