import React from "react";
import Links from "./Links.js";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img alt="logo" src="/img/logo.png"></img>
        </Link>
      </div>
      <Links />
    </div>
  );
};

export default Header;
