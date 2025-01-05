import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import SignUp from "../pages/userSignup";
import Signin from "../pages/userSignin";
import Navbar from "../components/navbar";

function Router() {
  return (
    <BrowserRouter>
  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

    </BrowserRouter>
  );
}

export default Router;
