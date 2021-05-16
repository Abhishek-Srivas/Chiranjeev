import React, { useState, useEffect } from "react";
import HospitalCard from "../../UI Elements/Hospital-Card/HospitalCard";
import "./UserHomePage.css";
// import csc from 'country-state-city';
import { Search } from "@material-ui/icons";
import NavbarSolid from "../../UI Elements/Navbar/Navbar-Solid";
import ServerService from "../../../ServerService";
import Loader from "../../UI Elements/Loader/Loader";

// const city = csc.getCitiesOfCountry("IN");
const UserHomePage = () => {
  const [hospitals, setHospitals] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState(false);

  useEffect(() => {
    ServerService.hospitalList()
      .then((res) => {
        console.log(res);
        setHospitals(res.data.List);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    const value = e.target.value;
    setCity(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { city: city };
    ServerService.hospitalSearchList(data)
      .then((res) => {
        console.log(res);
        setHospitals(res.data.List);
        setResults(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let numberOfHospitals;
  if (results)
    numberOfHospitals = (
      <p className="search-results">
        {hospitals.length} Hospital(s) found with this name in given location
      </p>
    );
  else numberOfHospitals = <p></p>;

  let HospitalList;
  if (hospitals)
    HospitalList = hospitals.map((data, index) => {
      return (
        <HospitalCard
          key={index}
          name={data.HospitalName}
          address={data.Address + ", " + data.City + ", " + data.State}
          beds={data.Bedavailability}
          oxygen={data.Oxygenavailability}
          remdesivir={data.Remdesiviravailability}
          plasma={data.Plasmaavailability}
          vaccines={data.Vaccineavailability}
          contact={data.Contact}
        />
      );
    });

  return (
    <div className="UserHomePage">
      <Loader />
      <NavbarSolid navlink="/login" linkName="Continue as Hospital" />
      <p className="UHP-h1">Find Hospital for patient</p>
      <form className="search-form" onSubmit={submitHandler}>
        <input
          name="city"
          placeholder="Enter your city to search hospitals near you"
          onChange={changeHandler}
        />
        <button type="submit" className="submit-button">
          <Search style={{ color: "#364863", fontSize: "2rem" }} />
        </button>
      </form>
      {numberOfHospitals}

      <div className="card-list">{HospitalList}</div>
    </div>
  );
};

export default UserHomePage;
