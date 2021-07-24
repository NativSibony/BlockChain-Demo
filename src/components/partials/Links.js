import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  const handleActive = (e) => {
    const allLinks = document.querySelectorAll(".link");
    if (allLinks) {
      allLinks.forEach((d) => {
        if (e.target.id === d.id) d.classList.toggle("active");
        else d.classList.remove("active");
      });
    }
  };
  return (
    <nav className="links-box">
      <ul className="links">
        <li>
          <Link className="link" id="Hash" onClick={handleActive} to="/Hash">
            Hash
          </Link>
        </li>
        <li>
          <Link className="link" id="Block" onClick={handleActive} to="/Block">
            Block
          </Link>
        </li>
        <li>
          <Link
            className="link"
            id="Blockchain"
            onClick={handleActive}
            to="/Blockchain"
          >
            Blockchain
          </Link>
        </li>
        <li>
          <Link
            className="link"
            id="Distributed"
            onClick={handleActive}
            to="/Distributed"
          >
            Distributed
          </Link>
        </li>
        <li>
          <Link
            className="link"
            id="Tokens"
            onClick={handleActive}
            to="/Tokens"
          >
            Tokens
          </Link>
        </li>
        <li>
          <Link
            className="link"
            id="Coinbase"
            onClick={handleActive}
            to="/Coinbase"
          >
            Coinbase
          </Link>
        </li>
        <li>
          <Link className="link" id="Keys" onClick={handleActive} to="/Keys">
            Keys
          </Link>
        </li>
        <li>
          <Link
            className="link"
            id="Signature"
            onClick={handleActive}
            to="/Signature"
          >
            Signature
          </Link>
        </li>
        <li>
          <Link
            className="link"
            id="Transaction"
            onClick={handleActive}
            to="/Transaction"
          >
            Transaction
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Links;
