import React from "react";
import { Hotel, LocationOn, Call } from "@material-ui/icons";
import "./HospitalCard.css";

const HospitalCard = (props) => {
  return (
    <div className="HospitalCard-Container">
      <div className="HospitalCard-Details">
        <div className="HN-container">
          <p className="hospitalName">{props.name}</p>
          <p className="location">
            <LocationOn /> {props.address}
          </p>
        </div>
        <p>
          <Hotel /> {props.beds}
        </p>
        <div className="other-details">
          <div>
            <ul>
              <li>{props.oxygen}</li>
              <li> {props.remdesivir}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>{props.plasma}</li>
              <li>{props.vaccines}</li>
            </ul>
          </div>
        </div>
        <p className="contact">
          <Call /> {props.contact}
        </p>
      </div>
    </div>
  );
};

export default HospitalCard;
