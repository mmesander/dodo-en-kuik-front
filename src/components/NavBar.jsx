// Functions
import React from "react";
import {NavLink} from "react-router-dom";

// Assets
import logo from "../assets/icons/dek-logo.png"

// Styles
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="navbar-outer-container">
                <span className="logo-container">
                    <img src={logo} alt="Dodo & Kuik app logo"/>
                    <h3>Dodo & Kuik</h3>
                </span>

            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({isActive}) => isActive ? "active-nav-link" : "default-nav-link"}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/search"
                        className={({isActive}) => isActive ? "active-nav-link" : "default-nav-link"}
                    >
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/suggestion"
                        className={({isActive}) => isActive ? "active-nav-link" : "default-nav-link"}
                    >
                        Suggestion
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/lists"
                        className={({isActive}) => isActive ? "active-nav-link" : "default-nav-link"}
                    >
                        Lists
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile"
                        className={({isActive}) => isActive ? "active-nav-link" : "default-nav-link"}
                    >
                        Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;