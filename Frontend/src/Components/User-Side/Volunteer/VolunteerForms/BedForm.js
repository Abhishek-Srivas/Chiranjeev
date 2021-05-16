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
  NoOfBed: "",
};

const altData = {
  message: "random",
  type: false,
};

const BedForm = () => {
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

    ServerService.DonateBeds(data)
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
            <p className="VF-h2">To Support People Donate Beds here </p>
          </div>
        </div>

        <div className="HD-formContainer">
          <form className="HD-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Name"
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

            <input
              type="number"
              min="0"
              placeholder="No. of Beds"
              name="NoOfBed"
              className="HD-form-input"
              onChange={changeHandler}
            />
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

export default BedForm;
