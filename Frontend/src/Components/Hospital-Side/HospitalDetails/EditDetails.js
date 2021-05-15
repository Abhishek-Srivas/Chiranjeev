import React, { useEffect, useState } from "react";
import "./HospitalDetails.css";
import plus from "../../../Assets/images/plus.svg";
import { ButtonSolid } from "../../UI Elements/Buttons/Buttons";
import ServerService from "../../../ServerService";
import Alert from "../../UI Elements/Alerts/Alerts";

const altData = {
  message: "random",
  type: false,
};

const EditDetails = () => {
  const [hospitalData, setHospitalData] = useState("");
  const [success, setSuccess] = useState(false);
  const [alertdata, setAlertData] = useState(altData);

  useEffect(() => {
    const id = localStorage.getItem("id");
    ServerService.hospitalData(id)
      .then((res) => {
        console.log(res);
        setHospitalData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);

    setHospitalData({
      ...hospitalData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      InchargeName: hospitalData.InchargeName,
      Address: hospitalData.Address,
      State: hospitalData.State,
      City: hospitalData.City,
      Contact: hospitalData.Contact,
      Bedavailability: hospitalData.Bedavailability,
      Plasmaavailability: hospitalData.Plasmaavailability,
      Vaccineavailability: hospitalData.Vaccineavailability,
      Oxygenavailability: hospitalData.Oxygenavailability,
      Remdesiviravailability: hospitalData.Remdesiviravailability,
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

  return (
    <div className="ED-Container">
      <div className="ED-header">
        <img src={plus} alt="icon" />
        <div>
          <p className="ED-h1">{hospitalData.HospitalName}</p>
          <p className="ED-h2">
            {hospitalData.Address}, {hospitalData.City}, {hospitalData.State}
          </p>
        </div>
      </div>
      <div className="HD-formContainer">
        <form className="HD-form" onSubmit={submitHandler}>
          <input
            onChange={changeHandler}
            type="text"
            placeholder="Incharge Name"
            name="InchargeName"
            className="HD-form-input"
            defaultValue={hospitalData.InchargeName}
          />
          <input
            onChange={changeHandler}
            type="number"
            min="0"
            placeholder="Contact"
            name="Contact"
            className="HD-form-input"
            defaultValue={hospitalData.Contact}
          />

          <div className="HD-select-wrapper">
            <select
              onChange={changeHandler}
              name="BedAvailability"
              value={hospitalData.Bedavailability}
            >
              <option value="Beds available">Beds available</option>
              <option value="Beds not available">Beds not available</option>
            </select>

            <select
              onChange={changeHandler}
              name="Plasmaavailability"
              value={hospitalData.Plasmaavailability}
            >
              <option value="Plasma available">Plasma available</option>
              <option value="Plasma not available">Plasma not available</option>
            </select>
          </div>

          <div className="HD-select-wrapper">
            <select
              onChange={changeHandler}
              name="Oxygenavailability"
              value={hospitalData.Oxygenavailability}
            >
              <option value="Oxygen available">Oxygen available</option>
              <option value="Oxygen not available">Oxygen not available</option>
            </select>

            <select
              onChange={changeHandler}
              name="Remdesiviravailability"
              value={hospitalData.Remdesiviravailability}
            >
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
              style={{ width: "36.5rem" }}
              value={hospitalData.Vaccineavailability}
            >
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
      {success ? <Alert alertdata={alertdata} /> : ""}
    </div>
  );
};

export default EditDetails;
