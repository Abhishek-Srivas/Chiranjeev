import React, { useState } from "react";
import NavbarSolid from "../../UI Elements/Navbar/Navbar-Solid";
import BedForm from "./VolunteerForms/BedForm";
import "./Volunteer.css";
import HospitalRequests from "./HospitalRequests/HospitalRequests";
import Loader from "../../UI Elements/Loader/Loader";

const VolunteerBed = () => {
  const [Switch, setSwitch] = useState(true);

  const toggleSwitch = () => {
    const value = !Switch;
    setSwitch(value);
  };

  let content;
  if (Switch) content = <BedForm />;
  else content = <HospitalRequests type="Bed" />;

  return (
    <div style={{ position: "relative" }}>
      <Loader />
      <NavbarSolid navlink="/donateplasma" linkName="Donate Plasma" />

      <div className="VB-Container">
        <div
          className={Switch ? "trigger" : "trigger clicked"}
          onClick={toggleSwitch}
        >
          <div className="box"></div>
          <div className="switchContent">
            <span>Provide Beds</span>
            <span>Hospital Requests</span>
          </div>
        </div>

        {content}
      </div>
    </div>
  );
};

export default VolunteerBed;
