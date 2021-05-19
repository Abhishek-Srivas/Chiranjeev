import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
import Logo from "../../../Assets/images/Logo.svg";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = (event) => {
    if (window.scrollY < 50 && scrolling === true) {
      setScrolling(false);
    } else if (window.scrollY > 50 && scrolling !== true) {
      setScrolling(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <nav
      className="nav"
      style={{
        background: scrolling ? "#ffffff" : "none",
        boxShadow: scrolling ? "inset 0px -2px 0px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Link
        to="home"
        spy={true}
        smooth={true}
        className={scrolling ? "logo-solid" : "logo"}
      >
        <img src={Logo} alt="logo" />
        <span>Chiranjeev</span>
      </Link>
      <Link
        to="volunteer"
        spy={true}
        smooth={true}
        className={scrolling ? "navlink-solid" : "navlink-outline"}
      >
        Become Volunteer
      </Link>{" "}
    </nav>
  );
};

export default Navbar;
