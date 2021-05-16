import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import Alert from "../UI Elements/Alerts/Alerts";
import { ButtonSolid } from "../UI Elements/Buttons/Buttons";
import NavbarSolid from "../UI Elements/Navbar/Navbar-Solid";
import ServerService from "../../ServerService";

const altData = {
  message: "random",
  type: false,
};

const Otp = () => {
  const [redirect, setRedirect] = useState(null);
  const [otp, setOtp] = useState("");

  const [success, setSuccess] = useState(false);
  const [alertdata, setAlertData] = useState(altData);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      Email: localStorage.getItem("email"),
      Otp: otp,
    };
    console.log(data);

    // console.log(data);
    ServerService.hospitalRegistrationOtp(data)
      .then((result) => {
        console.log("123");
        const alertData = {
          message: "You have successfuly signed in",
          type: true,
        };
        localStorage.setItem("token", result.data.TOken);
        console.log("456");
        console.log(result);
        setAlertData(alertData);
        setSuccess(true);
        localStorage.setItem("id", result.data.RegisteredHospital._id);
        console.log("timer");
        const timer = setTimeout(() => setRedirect("hospitaldetails"), 3000);
        console.log("timerClose");
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log("111");
        console.log(err.response);
        const alertData = {
          message: err.response.data.Error,
          type: false,
        };

        setAlertData(alertData);
        setSuccess(true);
      });

    setSuccess(false);
  };

  const resendOtp = () => {
    const data = {
      Email: localStorage.getItem("email"),
    };
    ServerService.resendOtp(data)
      .then((res) => {
        const alertData = {
          message: "an Otp has been re-sent to your email",
          type: true,
        };
        setAlertData(alertData);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.response);
        const alertData = {
          message: err.response.data.Error,
          type: false,
        };

        setAlertData(alertData);
        setSuccess(true);
      });
    setSuccess(false);
  };

  if (redirect) {
    return <Redirect to={`/${redirect}`} />;
  }
  return (
    <React.Fragment>
      <NavbarSolid navlink="/patienthome" linkName="Continue as Patient" />
      <div className="HospitalSignup-Container">
        <div className="HospitalSignupCard-Wrapper">
          <div className="HospitalSignupHeading-Wrapper">
            <h1>OTP Verification</h1>
            <p>Please enter your OTP to continue</p>
          </div>

          <form className="HospitalSignupForm" onSubmit={submitHandler}>
            <input
              value={otp}
              type="text"
              onChange={handleChange}
              className="HospitalSignupForm-Input"
              placeholder="Enter OTP"
              name="otp"
            />
            <p className="bottom-link">
              Didn't receive OTP?
              <span className="link" onClick={resendOtp}>
                Resend OTP{" "}
              </span>
            </p>
            <div className="HospitalSignup-Button">
              <ButtonSolid type="submit" width="100%">
                Submit
              </ButtonSolid>
            </div>
          </form>
        </div>

        {success ? <Alert alertdata={alertdata} /> : ""}
      </div>
    </React.Fragment>
  );
};

export default Otp;
