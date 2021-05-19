import React from "react";
import Sidebar from "react-sidebar";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  ExitToApp,
  Opacity,
  AddCircleOutline,
  HotelOutlined,
  HomeOutlined,
  Edit,
} from "@material-ui/icons";
import Logo from "../../../Assets/images/Logo.svg";

class SideBar extends React.Component {
  state = {
    sidebarDocked: true,
    sidebarOpen: false,
  };

  componentDidMount() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      this.setState({ sidebarDocked: false });
    } else this.setState({ sidebarDocked: true });
  }

  onSetSidebarOpen = () => {
    if (!this.state.sidebarDocked) {
      let open = !this.state.sidebarOpen;
      this.setState({ sidebarOpen: open });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="hamburger" onClick={() => this.onSetSidebarOpen()}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <Link to="/hospital/home">
          <div className="sidebarLogo">
            <img src={Logo} alt="logo" />
            <span
              style={{
                margin: "auto 1rem",
                color:
                  this.state.sidebarOpen || this.state.sidebarDocked
                    ? "#fff"
                    : "#364863",
              }}
            >
              Chiranjeev
            </span>
          </div>
        </Link>

        <Sidebar
          sidebar={
            <div className="sidebarContent">
              <div className="sidebarLinks">
                <Link to="/hospital/home">
                  <div
                    className={
                      this.props.active === "home" ? "activelink" : "sidelink"
                    }
                    onClick={() => {
                      // this.setStprops active: "home" });
                      this.onSetSidebarOpen();
                    }}
                  >
                    <HomeOutlined className="sidebarIcon" />
                    <span> Home </span>
                  </div>
                </Link>

                <Link to="/hospital/beddonors">
                  <div
                    className={
                      this.props.active === "beddonors"
                        ? "activelink"
                        : "sidelink"
                    }
                    onClick={() => {
                      // this.setStprops active: "bed donors" });
                      this.onSetSidebarOpen();
                    }}
                  >
                    <HotelOutlined className="sidebarIcon" />
                    <span> Bed Donors </span>
                  </div>
                </Link>
                <Link to="/hospital/plasmadonors">
                  <div
                    className={
                      this.props.active === "plasmadonors"
                        ? "activelink"
                        : "sidelink"
                    }
                    onClick={() => {
                      // this.setStprops active: "plasma donors" });
                      this.onSetSidebarOpen();
                    }}
                  >
                    <Opacity className="sidebarIcon" />
                    <span> Plasma Donors </span>
                  </div>
                </Link>
                <Link to="/hospital/makerequest">
                  <div
                    className={
                      this.props.active === "makerequest"
                        ? "activelink"
                        : "sidelink"
                    }
                    onClick={() => {
                      // this.setStprops active: "make request" });
                      this.onSetSidebarOpen();
                    }}
                  >
                    <AddCircleOutline className="sidebarIcon" />
                    <span> Make Request </span>
                  </div>
                </Link>

                <Link to="/hospital/editdetails">
                  <div
                    className={
                      this.props.active === "editdetails"
                        ? "activelink"
                        : "sidelink"
                    }
                    onClick={() => {
                      // this.setStprops active: "make request" });
                      this.onSetSidebarOpen();
                    }}
                  >
                    <Edit className="sidebarIcon" />
                    <span> Edit Details </span>
                  </div>
                </Link>
                <Link to="/">
                  <div
                    className="sidelink"
                    onClick={() => {
                      localStorage.removeItem("token");
                    }}
                  >
                    <ExitToApp className="sidebarIcon" />
                    <span> Logout </span>
                  </div>
                </Link>
              </div>
            </div>
          }
          sidebarClassName="sidebar"
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          shadow={false}
        >
          <div className="root">{this.props.children}</div>
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default SideBar;
