import React, { useState } from "react";
import "./VolunteerForms.css";
import handDip from "../../../../Assets/images/Forms/hand-dip.svg";
import { ButtonSolid } from "../../../UI Elements/Buttons/Buttons";
import Alert from "../../../UI Elements/Alerts/Alerts";
import { Redirect } from "react-router-dom";
import ServerService from "../../../../ServerService";

const details = {
  DonorName: "",
  Number: "",
  City: "",
  State: "",
  Age: "",
  Date: "",
  Gender: "",
  BloodGroup: "",
};
const altData = {
  message: "random",
  type: false,
};

const PlasmaForm = () => {
  const [type, setType] = useState("text");
  const [donorDetails, setDonorDetails] = useState(details);
  const [success, setSuccess] = useState(false);
  const [alertdata, setAlertData] = useState(altData);
  const [redirect, setRedirect] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setDonorDetails({
      ...donorDetails,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      ...donorDetails,
    };
    ServerService.DonatePlasma(data)
      .then((res) => {
        console.log(res);
        const alertData = {
          message:
            "Your Details have been uploaded successfully. Thankyou For your Support!",
          type: true,
        };
        setAlertData(alertData);
        setSuccess(true);
        const timer = setTimeout(() => setRedirect(" "), 3000);
        return () => clearTimeout(timer);
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
      <div className="VF-Container">
        <div className="VF-heading">
          <img src={handDip} alt="image" />
          <div>
            <p className="VF-h1">Please Fill Out Your Details</p>
            <p className="VF-h2">Donate Plasma and Help Save Lives </p>
          </div>
        </div>

        <div className="HD-formContainer">
          <form className="HD-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Donor Name"
              name="DonorName"
              className="HD-form-input"
              onChange={changeHandler}
            />
            <input
              type="number"
              min="0"
              placeholder="Contact"
              name="Number"
              className="HD-form-input"
              onChange={changeHandler}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                type="text"
                placeholder="State"
                name="State"
                className="HD-form-input input-small"
                onChange={changeHandler}
              />
              <input
                type="text"
                placeholder="City"
                name="City"
                className="HD-form-input input-small"
                onChange={changeHandler}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                type="number"
                min="0"
                placeholder=" Age"
                name="Age"
                className="HD-form-input input-small"
                onChange={changeHandler}
              />

              <select name="Gender" onChange={changeHandler}>
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                type={type}
                placeholder="Date of Recovery"
                name="Date"
                id="date"
                className="HD-form-input input-small"
                onClick={() => setType("date")}
                onChange={changeHandler}
              />

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
                <option value="AB-">AB+</option>
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
    </React.Fragment>
  );
};

export default PlasmaForm;
