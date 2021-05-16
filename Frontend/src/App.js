import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/Landing-Page/LandingPage";
import UserHomePage from "./Components/User-Side/HomePage/UserHomePage";
import HospitalSignUp from "./Components/Auth/SignUp";
import HospitalDetails from "./Components/Hospital-Side/HospitalDetails/HospitalDetails";
import HospitalLogin from "./Components/Auth/Login";
import Otp from "./Components/Auth/Otp";
import Hospital from "./Components/Hospital-Side/Hospital/Hospital";
import VolunteerBed from "./Components/User-Side/Volunteer/VolunteerBeds";
import VolunteerPlasma from "./Components/User-Side/Volunteer/VolunteerPlasma";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/donateplasma" component={VolunteerPlasma} />
        <Route exact path="/providebeds" component={VolunteerBed} />
        <Route exact path="/hospital/:id" component={Hospital} />
        <Route exact path="/patienthome" component={UserHomePage} />
        <Route exact path="/otp" component={Otp} />
        <Route exact path="/signup" component={HospitalSignUp} />
        <Route exact path="/login" component={HospitalLogin} />
        <Route exact path="/hospitaldetails" component={HospitalDetails} />
        <Route path="*" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
