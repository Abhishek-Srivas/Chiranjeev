import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Auth.css";
import Alert from "../UI Elements/Alerts/Alerts";
import { ButtonSolid } from "../UI Elements/Buttons/Buttons";
import NavbarSolid from "../UI Elements/Navbar/Navbar-Solid";
import ServerService from "../../ServerService";

const loginValues = {
  email: "",
  password: "",
};

const altData = {
  message: "random",
  type: false,
};

const HospitalLogin = () => {
  const [redirect, setRedirect] = useState(null);
  const [login, setLogin] = useState(loginValues);
  const [errors, setErrors] = useState({
    pass: true,
  });

  const [success, setSuccess] = useState(false);
  const [alertdata, setAlertData] = useState(altData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const validate = () => {
    const er = {};
    er.pass = true;
    if (!login.email) {
      er.emailS = "Email Required";
      er.pass = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        login.email
      )
    ) {
      er.emailS = "Email Address is Invalid";
      er.pass = false;
    }

    if (!login.password.trim()) {
      er.passwordS = "Password required";
      er.pass = false;
    } else if (login.password.length < 6) {
      er.passwordS = "Password needs to be 6 characters or more";
      er.pass = false;
    }

    setErrors(er);
  };

  const LoginHandler = (e) => {
    e.preventDefault();

    if (errors.pass) {
      const data = {
        Email: login.email,
        Password: login.password,
      };

      localStorage.setItem("email", login.email);
      console.log(data);
      ServerService.hospitalLogin(data)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          const alertData = {
            message: "Login Successful",
            type: true,
          };
          console.log(result);
          setAlertData(alertData);
          setSuccess(true);
          localStorage.setItem("id", result.data.HospitalDetails._id);
          if (result.data.HospitalDetails.City === "UpdateInfo") {
            const timer = setTimeout(
              () => setRedirect("hospitaldetails"),
              3000
            );
            return () => clearTimeout(timer);
          } else {
            const timer = setTimeout(() => setRedirect("hospital/home"), 3000);
            return () => clearTimeout(timer);
          }
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
            <h1>Welcome Back</h1>
            <p>Please Login to continue</p>
          </div>

          <form className="HospitalSignupForm" onSubmit={LoginHandler}>
            <input
              value={login.email}
              type="text"
              onChange={handleChange}
              className="HospitalSignupForm-Input"
              placeholder="Email"
              name="email"
            />
            <div className="Validation">
              {errors.emailS && <p>{errors.emailS}</p>}
            </div>
            <input
              value={login.password}
              type="password"
              onChange={handleChange}
              className="HospitalSignupForm-Input"
              placeholder="Passowrd"
              name="password"
            />
            <div className="Validation">
              {errors.passwordS && <p>{errors.passwordS}</p>}
            </div>
            {/* <p className="forgot-pw">
              <Link to="/forgotPassword">Forgot Password? </Link>
            </p> */}
            <div className="HospitalSignup-Button">
              <ButtonSolid type="submit" onClick={validate} width="100%">
                Login
              </ButtonSolid>
            </div>
          </form>

          <p className="bottom-link">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>

        {success ? <Alert alertdata={alertdata} /> : ""}
      </div>
    </React.Fragment>
  );
};

export default HospitalLogin;
