import React, { useState } from "react";
import Loader from "../../UI Elements/Loader/Loader";
import NavbarSolid from "../../UI Elements/Navbar/Navbar-Solid";
import HospitalRequests from "./HospitalRequests/HospitalRequests";
import "./Volunteer.css";
import PlasmaForm from "./VolunteerForms/PlasmaForm";

const VolunteerPlasma = () => {
  const [Switch, setSwitch] = useState(true);

  const toggleSwitch = () => {
    const value = !Switch;
    setSwitch(value);
  };

  let content;
  if (Switch) content = <PlasmaForm />;
  else content = <HospitalRequests type="Plasma" />;

  return (
    <div style={{ position: "relative" }}>
      <Loader />
      <NavbarSolid navlink="/providebeds" linkName="Provide Beds" />
      <div className="VB-Container">
        <div
          className={Switch ? "trigger" : "trigger clicked"}
          onClick={toggleSwitch}
        >
          <div className="box"></div>
          <div className="switchContent">
            <span>Donate Beds</span>
            <span>Hospital Requests</span>
          </div>
        </div>

        {content}
      </div>
    </div>
  );
};

export default VolunteerPlasma;
