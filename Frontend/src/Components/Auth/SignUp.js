import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import Alert from "../UI Elements/Alerts/Alerts";
import { ButtonSolid } from "../UI Elements/Buttons/Buttons";
import NavbarSolid from "../UI Elements/Navbar/Navbar-Solid";
import ServerService from "../../ServerService";

const signupValues = {
  userName: "",
  email: "",
  password: "",
};

const altData = {
  message: "random",
  type: false,
};

const HospitalSignUp = () => {
  const [redirect, setRedirect] = useState(null);
  const [signup, setSignup] = useState(signupValues);
  const [errors, setErrors] = useState({
    pass: true,
  });

  const [success, setSuccess] = useState(false);
  const [alertdata, setAlertData] = useState(altData);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;

    setSignup({
      ...signup,
      [name]: value,
    });
  };

  const validateSignup = () => {
    const er = {};
    er.pass = true;
    if (!signup.email) {
      er.emailS = "Email Required";
      er.pass = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        signup.email
      )
    ) {
      er.emailS = "Email Address is Invalid";
      er.pass = false;
    }

    if (!signup.password.trim()) {
      er.passwordS = "Password required";
      er.pass = false;
    } else if (signup.password.length < 6) {
      er.passwordS = "Password needs to be 6 characters or more";
      er.pass = false;
    }

    if (!signup.userName.trim()) {
      er.userName = "Username Required";
      er.pass = false;
    } else if (signup.userName.length < 3) {
      er.userName = "Username needs to be 3 characters or more";
      er.pass = false;
    }

    setErrors(er);
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    if (errors.pass) {
      const data = {
        HospitalName: signup.userName,
        Email: signup.email,
        Password: signup.password,
      };

      localStorage.setItem("email", signup.email);

      ServerService.hospitalRegistration(data)
        .then((result) => {
          const alertData = {
            message: "OTP send to your Email",
            type: true,
          };
          setAlertData(alertData);
          setSuccess(true);
          const timer = setTimeout(() => setRedirect("otp"), 3000);
          return () => clearTimeout(timer);
        })
        .catch((err) => {
          const alertData = {
            message: err.response.data.Error,
            type: false,
          };

          setAlertData(alertData);
          setSuccess(true);
        });

      setSuccess(false);
    }
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
            <h1>Create New Account</h1>
            <p>Please Register your Hospital to continue</p>
          </div>

          <form className="HospitalSignupForm" onSubmit={signUpHandler}>
            <input
              value={signup.userName}
              type="text"
              onChange={handleSignupChange}
              className="HospitalSignupForm-Input"
              placeholder="Hospital Name"
              name="userName"
            />
            <div className="Validation">
              {errors.userName && <p>{errors.userName}</p>}
            </div>
            <input
              value={signup.email}
              type="text"
              onChange={handleSignupChange}
              className="HospitalSignupForm-Input"
              placeholder="Email"
              name="email"
            />
            <div className="Validation">
              {errors.emailS && <p>{errors.emailS}</p>}
            </div>
            <input
              value={signup.password}
              type="password"
              onChange={handleSignupChange}
              className="HospitalSignupForm-Input"
              placeholder="Passowrd"
              name="password"
            />
            <div className="Validation">
              {errors.passwordS && <p>{errors.passwordS}</p>}
            </div>
            <div className="HospitalSignup-Button">
              <ButtonSolid type="submit" onClick={validateSignup} width="100%">
                Sign Up
              </ButtonSolid>
            </div>
          </form>

          <p className="bottom-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        {success ? <Alert alertdata={alertdata} /> : ""}
      </div>
    </React.Fragment>
  );
};

export default HospitalSignUp;
