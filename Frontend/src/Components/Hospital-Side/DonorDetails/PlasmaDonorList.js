import React, { useEffect, useState } from "react";
import ServerService from "../../../ServerService";
import DonorCard from "../../UI Elements/DonorCard/DonorCard";
import "./DonorDetails.css";

var change = true;
const PlasmaDonorList = () => {
  const [donorList, setDonorList] = useState("");

  useEffect(() => {
    ServerService.PlasmaDonorList()
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
          type="plasma"
          key={index}
          name={data.DonorName}
          BloodGroup={data.BloodGroup}
          City={data.City}
          State={data.State}
          Gender={data.Gender}
          contact={data.Number}
        />
      );
    });
  }

  return (
    <div>
      <p className="DonorHeading">Plasma Donors</p>
      {DonorList}
    </div>
  );
};

export default PlasmaDonorList;
