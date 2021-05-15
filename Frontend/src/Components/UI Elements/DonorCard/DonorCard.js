import React from "react";
import "./DonorCard.css";
import { Hotel, LocationOn, Call, Opacity } from "@material-ui/icons";

const DonorCard = (props) => {
  let Details;

  if (props.type === "bed")
    Details = (
      <React.Fragment>
        {" "}
        <Hotel /> {props.NoOfBed} beds space available{" "}
      </React.Fragment>
    );
  else
    Details = (
      <React.Fragment>
        {" "}
        <Opacity />
        {props.BloodGroup} , {props.Gender}
      </React.Fragment>
    );

  return (
    <div className="DonorCard">
      <p className="DonorName">{props.name}</p>
      <p>
        <LocationOn /> {props.City}, {props.State}
      </p>
      <p>{Details}</p>
      <p className="DonorContact">
        <Call /> {props.contact}
      </p>
    </div>
  );
};

export default DonorCard;
