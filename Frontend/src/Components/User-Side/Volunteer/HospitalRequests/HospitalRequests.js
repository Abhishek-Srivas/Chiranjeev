import React, { useState, useEffect } from "react";
import { Search } from "@material-ui/icons";
import ServerService from "../../../../ServerService";
import HospitalRequestCard from "../HospitalRequests/HospitalRequestCard";

const HospitalRequests = (props) => {
  const [hospitals, setHospitals] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState(false);

  useEffect(() => {
    if (props.type === "Bed") {
      ServerService.HospitalBedRequests()
        .then((res) => {
          // console.log(res);
          setHospitals(res.data.BedReq);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ServerService.HospitalPlasmaRequests()
        .then((res) => {
          // console.log(res);
          setHospitals(res.data.PlasmaReq);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const changeHandler = (e) => {
    const value = e.target.value;
    setCity(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { city: city };
    // ServerService.hospitalSearchList(data)
    //   .then((res) => {
    //     console.log(res);
    //     setHospitals(res.data.List);
    //     setResults(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        <HospitalRequestCard
          type={props.type}
          key={index}
          name={data.HospitalDetails.HospitalName}
          address={
            data.HospitalDetails.Address +
            ", " +
            data.HospitalDetails.City +
            ", " +
            data.HospitalDetails.State
          }
          NoOfBed={data.NumberOfBed}
          BloodGroup={data.BloodGroup}
          contact={data.HospitalDetails.Contact}
        />
      );
    });

  return (
    <div className="HR-Container">
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

export default HospitalRequests;
