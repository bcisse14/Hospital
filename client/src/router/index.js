import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import SignUp from "../pages/userSignup";
import Signin from "../pages/userSignin";
import Navbar from "../components/navbar";
import Patients from "../pages/patients";
import AddPatient from "../pages/addPatient";
import PatientList from "../pages/patientsList";
import EditPatient from "../pages/editPatient";

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
      </Routes>

    </BrowserRouter>
  );
}

export default Router;
