// Functions
import React from "react";
import {NavLink} from "react-router-dom";

// Assets
import logo from "../assets/icons/dek-logo.png"

// Styles
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="nav-bar-outer-container">
          <span className="logo-container">
              <img src={logo} alt="Dodo & Kuik logo"/>
              <h3>Dodo & Kuik</h3>
          </span>
        </nav>


    );
}

export default NavBar;