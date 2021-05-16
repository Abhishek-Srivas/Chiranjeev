import React from "react";
import { Hotel, LocationOn, Call, Opacity } from "@material-ui/icons";

const HospitalRequestCard = (props) => {
  let Details;

  if (props.type === "Bed")
    Details = (
      <React.Fragment>
        {" "}
        <Hotel /> {props.NoOfBed} beds Required{" "}
      </React.Fragment>
    );
  else
    Details = (
      <React.Fragment>
        {" "}
        <Opacity />
        Required {props.BloodGroup} Plasma
      </React.Fragment>
    );

  return (
    <div className="DonorCard">
      <p className="DonorName">{props.name} Hospital</p>
      <p>
        <LocationOn /> {props.address}
      </p>
      <p>{Details}</p>
      <p className="DonorContact">
        <Call /> {props.contact}
      </p>
    </div>
  );
};

export default HospitalRequestCard;
