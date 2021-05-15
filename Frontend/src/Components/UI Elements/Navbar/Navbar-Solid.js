import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavbarSolid = (props) => {
  return (
    <nav className="nav-user">
      <Link to="/" className="logo-solid">
        Chiranjeev
      </Link>
      <Link to={props.navlink} className="navlink-solid">
        {props.linkName}
      </Link>{" "}
    </nav>
  );
};

export default NavbarSolid;
