import React, { useEffect, useState } from "react";
import ServerService from "../../../ServerService";
import DonorCard from "../../UI Elements/DonorCard/DonorCard";
import "./DonorDetails.css";

const BedDonorList = () => {
  const [donorList, setDonorList] = useState("");

  useEffect(() => {
    ServerService.BedDonorList()
      .then((res) => {
        console.log(res);
        setDonorList(res.data.DonorList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let DonorList;
  if (donorList) {
    DonorList = donorList.map((data, index) => {
      return (
        <DonorCard
          type="bed"
          key={index}
          name={data.DonorName}
          NoOfBed={data.NoOfBed}
          City={data.City}
          State={data.State}
          contact={data.Number}
        />
      );
    });
  }

  return (
    <div>
      <p className="DonorHeading">Bed Donors</p>
      {DonorList}
    </div>
  );
};

export default BedDonorList;
