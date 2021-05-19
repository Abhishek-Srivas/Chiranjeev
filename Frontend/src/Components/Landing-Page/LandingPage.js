import React from "react";
import "./LandingPage.css";
import bgElementsLeft from "../../Assets/images/Home-Images/bgElementsLeft.svg";
import bgElementsRight from "../../Assets/images/Home-Images/bgElementsRight.svg";
import doctor from "../../Assets/images/Home-Images/doctor.svg";
import corona from "../../Assets/images/Home-Images/corona.svg";
import Hands from "../../Assets/images/Volunteer-images/Hand.svg";
import Drop from "../../Assets/images/Volunteer-images/B-Drop.svg";
import HandDip from "../../Assets/images/Volunteer-images/HandDip.svg";
import HandStone from "../../Assets/images/Volunteer-images/HandStone.svg";
import Injection from "../../Assets/images/Volunteer-images/Injection.svg";
import mediBox from "../../Assets/images/Volunteer-images/mediBox.svg";
import Navbar from "../UI Elements/Navbar/Navbar";
import { ButtonOutline, ButtonSolid } from "../UI Elements/Buttons/Buttons";
import { Link } from "react-router-dom";
import { Instagram, LinkedIn, MailOutline } from "@material-ui/icons";

const LandingPage = () => {
  return (
    <section className="LandingPage">
      {/* Home Section */}
      <div className="homeContainer" id="home">
        <Navbar />
        <div className="homeHeading">
          <p className="homeH1">
            Save Yourself
            <br /> Save the World!
          </p>
          <p className="homeH2">Explore as Patient or Register as Hospital!</p>
        </div>
        <img
          src={bgElementsLeft}
          className="bg-elements-left"
          alt="bg-elements-left"
        />
        <img
          src={bgElementsRight}
          className="bg-elements-right"
          alt="bg-elements-right"
        />
        <img src={doctor} className="doctor-svg" alt="doctor" />
        <img src={corona} className="corona-svg" alt="corona" />

        <div className="home-button-container">
          <div style={{ marginRight: "0.8rem" }}>
            <Link to="/patienthome">
              <ButtonSolid>Continue as Patient</ButtonSolid>
            </Link>
          </div>

          <div style={{ marginLeft: "0.8rem" }}>
            <Link to="/login">
              <ButtonOutline>Continue as Hospital</ButtonOutline>
            </Link>
          </div>
        </div>
      </div>
      {/* Volunteer Section */}
      <div className="Volunteer-Container" id="volunteer">
        <div className="Volunteer-Heading">
          <p className="VolunteerH1">Become a volunteer</p>
          <p className="VolunteerH2">
            By Donating Space or Plasma for covid patient in Hospitals
          </p>
        </div>
        <div className="Volunteer-Card-Wrapper">
          <Link to="/providebeds">
            <div className="Volunteer-Card">
              <img src={Hands} alt="Hand img" />
              <p>Provide Beds</p>
            </div>
          </Link>

          <Link to="donateplasma">
            <div className="Volunteer-Card">
              <img src={Drop} alt="Drop img" />
              <p>Donate Plasma</p>
            </div>
          </Link>
        </div>

        <img
          src={HandDip}
          alt="A img must be here"
          className="Volunteer-HandDip"
        />

        <img
          src={HandStone}
          alt="A img must be here"
          className="Volunteer-HandStone"
        />

        <img
          src={Injection}
          alt="A img must be here"
          className="Volunteer-Injection"
        />

        <img
          src={mediBox}
          alt="A img must be here"
          className="Volunteer-mediBox"
        />
      </div>
      {/* Footer Section */}
      <div className="Footer">
        <div className="Footer-Top">
          <div>
            <p className="Footer-h1">About Us</p>
            <p className="Footer-h2">
              We aim to provide a platform where people can see the number of
              hospitals in their city having free beds, plasma, remdesivirs,
              vaccines and other essential COVID facilities. Hospitals can
              register themselves in the app and request plasma donations by the
              recovered patients and for extra spaces needed for the patients.
              We also aim to encourage people to volunteer by providing bed
              space and donating plasma.
            </p>
          </div>
          <div>
            <p className="Footer-h1"> Contact Us </p>
            <div className="social-icons">
              <MailOutline />
              <Instagram />
              <LinkedIn />
            </div>
          </div>
        </div>
        <hr />
        <div className="Footer-Bottom">2021 &copy; Chiranjeev</div>
      </div>
    </section>
  );
};

export default LandingPage;
