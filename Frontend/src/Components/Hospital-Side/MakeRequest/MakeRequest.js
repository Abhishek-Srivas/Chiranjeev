import React, { useState } from "react";
import "./MakeRequest.css";
import "../HospitalDetails/HospitalDetails.css";
import { ButtonSolid } from "../../UI Elements/Buttons/Buttons";
import ServerService from "../../../ServerService";
import Alert from "../../UI Elements/Alerts/Alerts";

const altData = {
  message: "random",
  type: false,
};

const MakeRequest = () => {
  const [Switch, setSwitch] = useState(true);
  const [display, setDisplay] = useState(true);
  const [requestData, setRequestData] = useState("");
  const [success, setSuccess] = useState(false);
  const [alertdata, setAlertData] = useState(altData);

  const toggleSwitch = () => {
    const value = !Switch;
    setSwitch(value);
    const timer = setTimeout(() => setDisplay(value), 200);
    return () => clearTimeout(timer);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);

    setRequestData({
      [name]: value,
    });
  };

  const submitPlasmaRequest = (e) => {
    e.preventDefault();
    const data = {
      ...requestData,
    };
    ServerService.plasmaRequest(data, localStorage.getItem("id"))
      .then((res) => {
        console.log(res);
        const alertData = {
          message: "Request made succesfully",
          type: true,
        };
        setAlertData(alertData);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setSuccess(false);
  };

  const submitBedRequest = (e) => {
    e.preventDefault();
    const data = {
      ...requestData,
    };
    ServerService.bedRequest(data, localStorage.getItem("id"))
      .then((res) => {
        console.log(res);
        const alertData = {
          message: "Request made succesfully",
          type: true,
        };
        setAlertData(alertData);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setSuccess(false);
  };

  let requestForm;
  if (display) {
    requestForm = (
      <form className={Switch ? "" : "fade"} onSubmit={submitPlasmaRequest}>
        <select name="BloodGroup" onChange={changeHandler}>
          <option value="" disabled selected>
            Blood Group
          </option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <div className="MR-buttonContainer">
          <ButtonSolid type="submit" width="100%">
            Submit
          </ButtonSolid>
        </div>
      </form>
    );
  } else {
    requestForm = (
      <form className={Switch ? "fade" : ""} onSubmit={submitBedRequest}>
        <input
          type="number"
          min="0"
          placeholder="Number of beds required "
          name="NumberOfBed"
          className="MR-form-input"
          onChange={changeHandler}
        />

        <div className="MR-buttonContainer">
          <ButtonSolid type="submit" width="100%">
            Submit
          </ButtonSolid>
        </div>
      </form>
    );
  }

  return (
    <div className="MR-Container">
      <div
        className={Switch ? "trigger" : "trigger clicked"}
        onClick={toggleSwitch}
      >
        <div className="box"></div>
        <div className="switchContent">
          <span>Request Plasma</span>
          <span>Request Bed</span>
        </div>
      </div>
      <div className="MR-Form">{requestForm}</div>
      {success ? <Alert alertdata={alertdata} /> : ""}
    </div>
  );
};

export default MakeRequest;
