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
import RendezVous from "../pages/RendezVous/rendezVous";
import AddRendezVous from "../pages/RendezVous/addRendezVous";
import RendezVousList from "../pages/RendezVous/rendezVousList";
import EditRendezVous from "../pages/RendezVous/editRendezVous";
import RendezVousDetails from "../pages/RendezVous/rendezVousDetails";
import HospitalisationDetails from "../pages/Hospitalisations/hospitalisationDetails";
import ConsultationDetails from "../pages/Consultations/consultationDetails";
import MedecinDetail from "../pages/Medecins/medecinDetails";
import PatientDetail from "../pages/Patients/patientDetails";
import Pharmacie from "../pages/Pharmacie/pharmacie";
import PharmacieDetails from "../pages/Pharmacie/pharmacieDetails";
import AddMedicament from "../pages/Pharmacie/addPharmacie";
import EditMedicament from "../pages/Pharmacie/editPharmacie";
import PharmacieList from "../pages/Pharmacie/pharmacieList";
import Urgence from "../pages/Urgence/urgence";
import UrgenceList from "../pages/Urgence/urgenceList";
import UrgenceDetails from "../pages/Urgence/urgenceDetails";
import AddUrgence from "../pages/Urgence/addUrgence";
import EditUrgence from "../pages/Urgence/editUrgence";
import AddPrescription from "../pages/Prescriptions/addPrescription";
import EditPrescription from "../pages/Prescriptions/editPrescription";
import PrescriptionDetails from "../pages/Prescriptions/prescriptionDetails";
import PrescriptionList from "../pages/Prescriptions/prescriptionList";
import Prescription from "../pages/Prescriptions/prescription";
import Gynecology from "../pages/Gynecology/gynecology";
import AddGynecology from "../pages/Gynecology/addGynecology";
import EditGynecology from "../pages/Gynecology/editGynecology";
import GynecologyList from "../pages/Gynecology/gynecologyList";
import GynecologyDetails from "../pages/Gynecology/gynecologyDetails";
import AddRadiologie from "../pages/Radiologie/addRadiologie";
import RadiologieDetails from "../pages/Radiologie/radiologieDetails";
import EditRadiologie from "../pages/Radiologie/editRadiologie";
import Radiologies from "../pages/Radiologie/radiologie";
import RadiologieList from "../pages/Radiologie/radiologieList";


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
          <Route path="details/:id" element={<PatientDetail />} />
        </Route>
        <Route path="/patients/edit/:id" element={<EditPatient />} />
        <Route path="/medecins" element={<Medecins />}>
          <Route path="add" element={<AddMedecin />} />
          <Route path="list" element={<MedecinList />} />
          <Route path="details/:id" element={<MedecinDetail />} />
        </Route>
        <Route path="/medecins/edit/:id" element={<EditMedecin />} />
        <Route path="/consultations" element={<Consultations />}>
          <Route path="add" element={<AddConsultation />} />
          <Route path="list" element={<ConsultationList />} />
          <Route path="details/:id" element={<ConsultationDetails />} />
        </Route>
        <Route path="/consultations/edit/:id" element={<EditConsultation />} />
        <Route path="/hospitalisations" element={<Hospitalisations />}>
          <Route path="add" element={<AddHospitalisation />} />
          <Route path="list" element={<HospitalisationList />} />
          <Route path="details/:id" element={<HospitalisationDetails />} />
        </Route>
        <Route path="/hospitalisations/edit/:id" element={<EditHospitalisation />} />
        <Route path="/rendezvous" element={<RendezVous />}>
          <Route path="add" element={<AddRendezVous />} />
          <Route path="list" element={<RendezVousList />} />
          <Route path="details/:id" element={<RendezVousDetails />} />
        </Route>
        <Route path="/rendezvous/edit/:id" element={<EditRendezVous />} />
        <Route path="/pharmacie" element={<Pharmacie />}>
          <Route path="add" element={<AddMedicament />} />
          <Route path="list" element={<PharmacieList />} />
          <Route path="details/:id" element={<PharmacieDetails />} />
        </Route>
        <Route path="/pharmacie/edit/:id" element={<EditMedicament />} />
        <Route path="/urgence" element={<Urgence />}>
          <Route path="add" element={<AddUrgence />} />
          <Route path="list" element={<UrgenceList />} />
          <Route path="details/:id" element={<UrgenceDetails />} />
        </Route>
        <Route path="/urgence/edit/:id" element={<EditUrgence />} />
        <Route path="/prescriptions/" element={<Prescription />}>
          <Route path="add" element={<AddPrescription />} />
          <Route path="list" element={<PrescriptionList />} />
          <Route path="details/:id" element={<PrescriptionDetails />} />
        </Route>
        <Route path="/prescription/edit/:id" element={<EditPrescription />} />
        <Route path="/gynecologie/" element={<Gynecology />}>
          <Route path="add" element={<AddGynecology />} />
          <Route path="list" element={<GynecologyList />} />
          <Route path="details/:id" element={<GynecologyDetails />} />
        </Route>
        <Route path="/gynecologie/edit/:id" element={<EditGynecology />} />
        <Route path="/radiologie/" element={<Radiologies />}>
          <Route path="add" element={<AddRadiologie />} />
          <Route path="list" element={<RadiologieList />} />
          <Route path="details/:id" element={<RadiologieDetails />} />
        </Route>
        <Route path="/radiologie/edit/:id" element={<EditRadiologie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

