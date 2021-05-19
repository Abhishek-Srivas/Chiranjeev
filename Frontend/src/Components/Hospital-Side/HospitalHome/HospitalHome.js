import React, { useEffect, useState } from "react";
import "./HospitalHome.css";
import welcome from "../../../Assets/images/welcome.svg";
import RequestCard from "./RequestCard";
import ServerService from "../../../ServerService";

const HospitalHome = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [bedRequests, setBedRequests] = useState("");
  const [plasmaRequests, setPlasmaRequests] = useState("");

  useEffect(() => {
    ServerService.hospitalHome(localStorage.getItem("id"))
      .then((res) => {
        console.log(res);
        setHospitalName(res.data.HospitalName);
        setBedRequests(res.data.BedRequest);
        setPlasmaRequests(res.data.PlasmaRequest);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const deleteRequest = (id, type) => {
    ServerService.DeleteRequest(id, type)
      .then((res) => {
        console.log(res);
        let arr;

        if (type === "PlasmaDelete") arr = [...plasmaRequests];
        else arr = [...bedRequests];

        for (var i = 0; i < arr.length; i++) {
          if (arr[i]._id === id) {
            arr.splice(i, 1);
            i--;
          }
        }
        if (type === "PlasmaDelete") setPlasmaRequests(arr);
        else setBedRequests(arr);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  let PlasmaReqs;
  if (plasmaRequests) {
    PlasmaReqs = plasmaRequests.map((data, index) => {
      return (
        <RequestCard
          key={index}
          requestType="Plasma"
          details={"Blood Group : " + data.BloodGroup}
          id={data._id}
          deleteHandler={() => deleteRequest(data._id, "PlasmaDelete")}
        />
      );
    });
  }

  let BedReqs;
  if (bedRequests) {
    BedReqs = bedRequests.map((data, index) => {
      return (
        <RequestCard
          key={index}
          requestType="Beds"
          details={"No. of beds required : " + data.NumberOfBed}
          id={data._id}
          deleteHandler={() => deleteRequest(data._id, "BedDelete")}
        />
      );
    });
  }

  if (bedRequests && plasmaRequests) {
    BedReqs = <h2>You have not made any Requests yet!</h2>;
  }

  return (
    <div className="HH-Container">
      <div style={{ display: "flex" }}>
        <img src={welcome} className="welcome-img" alt="welcome" />
        <div>
          <p className="HH-h1"> Welcome {hospitalName} </p>
          <p className="HH-h2">
            {" "}
            Please update your details regularly regarding the availability of
            various medical facilities at your Hospital to avoid any
            inconvenience to the patients.{" "}
          </p>
        </div>
      </div>
      <p className="HH-h3">Your Requests</p>
      <div className="HH-CardContainer">{BedReqs}</div>
      <div className="HH-CardContainer">{PlasmaReqs}</div>
    </div>
  );
};

export default HospitalHome;
