import React from "react";
import { Link } from "react-router-dom";
import "./HospitalHome.css";

const RequestCard = (props) => {
  let link;
  if (props.requestType === "Plasma") link = "/hospital/plasmadonors";
  else link = "/hospital/beddonors";
  return (
    <div className="RequestCard">
      <p className="RC-h1">You requested {props.requestType}</p>
      <p className="RC-h2">{props.details}</p>

      <div className="RC-btn-container">
        <button className="btn-1" onClick={props.deleteHandler}>
          Delete
        </button>
        <Link to={link}>
          <button className="btn-2">View Response</button>
        </Link>
      </div>
    </div>
  );
};

export default RequestCard;
