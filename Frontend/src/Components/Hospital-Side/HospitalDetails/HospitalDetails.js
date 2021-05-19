import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./HospitalDetails.css";
import handDip from "../../../Assets/images/Forms/hand-dip.svg";
import NavbarSolid from "../../UI Elements/Navbar/Navbar-Solid";
import { ButtonSolid } from "../../UI Elements/Buttons/Buttons";
import ServerService from "../../../ServerService";
import Alert from "../../UI Elements/Alerts/Alerts";
import Loader from "../../UI Elements/Loader/Loader";

const details = {
  InchargeName: "",
  Address: "",
  State: "",
  City: "",
  Contact: "",
  Bedavailability: "",
  Plasmaavailability: "",
  Vaccineavailability: "",
  Oxygenavailability: "",
  Remdesiviravailability: "",
};

const altData = {
  message: "random",
  type: false,
};

const HospitalDetails = () => {
  const [hospitalDetails, setHospitalDetails] = useState(details);
  const [success, setSuccess] = useState(false);
  const [alertdata, setAlertData] = useState(altData);
  const [redirect, setRedirect] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setHospitalDetails({
      ...hospitalDetails,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      ...hospitalDetails,
    };
    // console.log(data);
    const id = localStorage.getItem("id");
    ServerService.hospitalDetails(data, id)
      .then((res) => {
        console.log(res);
        const alertData = {
          message: "Details Updated Successfully",
          type: true,
        };
        setAlertData(alertData);
        setSuccess(true);
        const timer = setTimeout(() => setRedirect("hospital/home"), 3000);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log(err.response);
        const alertData = {
          message: "Error Occurred",
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
    <div style={{ position: "relative" }}>
      <Loader />
      {/* HD here refers to hospital details */}
      <NavbarSolid navlink="/patienthome" linkName="Continue as Patient" />
      <div className="HospitalDetailsContainer">
        <div className="HD-heading">
          <img src={handDip} alt="image" />
          <p>Please Fill Out Your Details</p>
        </div>

        <div className="HD-formContainer">
          <form className="HD-form" onSubmit={submitHandler}>
            <input
              onChange={changeHandler}
              type="text"
              placeholder="Incharge Name"
              name="InchargeName"
              className="HD-form-input"
            />
            <input
              onChange={changeHandler}
              type="number"
              min="0"
              placeholder="Contact"
              name="Contact"
              className="HD-form-input"
            />
            <input
              onChange={changeHandler}
              type="text"
              placeholder="Address"
              name="Address"
              className="HD-form-input"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                onChange={changeHandler}
                type="text"
                placeholder="State"
                name="State"
                className="HD-form-input input-small"
              />
              <input
                onChange={changeHandler}
                type="text"
                placeholder="City"
                name="City"
                className="HD-form-input input-small"
              />
            </div>

            <div className="HD-select-wrapper">
              <select onChange={changeHandler} name="Bedavailability">
                <option value="" disabled selected>
                  Beds
                </option>
                <option value="Beds available">Beds available</option>
                <option value="Beds not available">Beds not available</option>
              </select>

              <select onChange={changeHandler} name="Plasmaavailability">
                <option value="" disabled selected>
                  Plasma Therapy
                </option>
                <option value="Plasma available">Plasma available</option>
                <option value="Plasma not available">
                  Plasma not available
                </option>
              </select>
            </div>

            <div className="HD-select-wrapper">
              <select onChange={changeHandler} name="Oxygenavailability">
                <option value="" disabled selected>
                  Oxygen
                </option>
                <option value="Oxygen available">Oxygen available</option>
                <option value="Oxygen not available">
                  Oxygen not available
                </option>
              </select>

              <select onChange={changeHandler} name="Remdesiviravailability">
                <option value="" disabled selected>
                  Remdesivir
                </option>
                <option value="Remdesivirs available">
                  Remdesivirs available
                </option>
                <option value="Remdesivirs not available">
                  Remdesivirs not available
                </option>
              </select>
            </div>
            <div className="HD-select-wrapper">
              <select
                onChange={changeHandler}
                name="Vaccineavailability"
                className="dropdown"
              >
                <option value="" disabled selected>
                  Vaccines
                </option>
                <option value="Vaccines available">Vaccines available</option>
                <option value="Vaccines not available">
                  Vaccines not available
                </option>
              </select>
            </div>
            <div className="HD-buttonContainer">
              <ButtonSolid type="submit" width="100%">
                Submit
              </ButtonSolid>
            </div>
          </form>
        </div>
      </div>
      {success ? <Alert alertdata={alertdata} /> : ""}
    </div>
  );
};

export default HospitalDetails;
