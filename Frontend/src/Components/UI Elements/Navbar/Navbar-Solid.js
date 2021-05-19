import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../../Assets/images/Logo.svg";

const NavbarSolid = (props) => {
  return (
    <nav className="nav-user">
      <Link to="/" className="logo-solid">
        <img src={Logo} alt="logo" />
        <span>Chiranjeev</span>
      </Link>
      <Link to={props.navlink} className="navlink-solid">
        {props.linkName}
      </Link>{" "}
    </nav>
  );
};

export default NavbarSolid;
