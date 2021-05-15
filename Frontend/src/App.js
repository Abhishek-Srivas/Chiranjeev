import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/Landing-Page/LandingPage";
import HospitalSignUp from "./Components/Auth/SignUp";
import HospitalLogin from "./Components/Auth/Login";
import Otp from "./Components/Auth/Otp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/otp" component={Otp} />
        <Route exact path="/signup" component={HospitalSignUp} />
        <Route exact path="/login" component={HospitalLogin} />
        <Route path="*" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
