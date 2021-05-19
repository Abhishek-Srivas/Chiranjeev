import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SideBar from "../../UI Elements/Sidebar/Sidebar";
import BedDonorList from "../DonorDetails/BedDonorList";
import PlasmaDonorList from "../DonorDetails/PlasmaDonorList";
import EditDetails from "../HospitalDetails/EditDetails";
import HospitalHome from "../HospitalHome/HospitalHome";
import MakeRequest from "../MakeRequest/MakeRequest";
import "./Hospital.css";
import Loader from "../../UI Elements/Loader/Loader";

const Hospital = (props) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    var active = props.match.params.id;
    setActive(active);
  });

  return (
    <SideBar active={active}>
      <div className="hospitalContent">
        <Loader />
        <Switch>
          <Route exact path="/hospital/home" component={HospitalHome} />
          <Route exact path="/hospital/makerequest" component={MakeRequest} />
          <Route exact path="/hospital/beddonors" component={BedDonorList} />
          <Route
            exact
            path="/hospital/plasmadonors"
            component={PlasmaDonorList}
          />
          <Route exact path="/hospital/editdetails" component={EditDetails} />
          <Route path="/hospital/*" component={() => <div>not found</div>} />
        </Switch>
      </div>
    </SideBar>
  );
};

export default Hospital;
