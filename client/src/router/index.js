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
import Consultations from "../pages/Consultations/consultation";
import AddConsultation from "../pages/Consultations/addConsultation";
import ConsultationList from "../pages/Consultations/consultationList";
import EditConsultation from "../pages/Consultations/editConsultation";
import HospitalisationList from "../pages/Hospitalisations/hospitalisationList";
import AddHospitalisation from "../pages/Hospitalisations/addHospitalisation";
import Hospitalisations from "../pages/Hospitalisations/hospitalisation";
import EditHospitalisation from "../pages/Hospitalisations/editHospitalisation";
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
      <Route path="/consultations" element={<Consultations />}>
        <Route path="add" element={<AddConsultation />} />
        <Route path="list" element={<ConsultationList />} />
      </Route>
      <Route path="/consultations/edit/:id" element={<EditConsultation />} />
      <Route path="/hospitalisations" element={<Hospitalisations />}>
        <Route path="/hospitalisations/add" element={<AddHospitalisation />} />
        <Route path="/hospitalisations/list" element={<HospitalisationList />} />
      </Route>
      <Route path="/hospitalisations/edit/:id" element={<EditHospitalisation />} />
      </Routes>


    </BrowserRouter>
  );
}

export default Router;
