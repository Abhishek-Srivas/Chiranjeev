import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./Loader.css";
import corona from "../../../Assets/images/corona.gif";

const Loader = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <React.Fragment>
      {promiseInProgress === true ? (
        <div className="LoaderContainer">
          <img src={corona} className="loader" alt="spinner" />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Loader;
