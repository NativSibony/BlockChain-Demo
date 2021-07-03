import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <nav className="links-box">
      <ul className="links">
        <li>
          <Link className="link" to="/Hash">
            Hash
          </Link>
        </li>
        <li>
          <Link className="link" to="/Block">
            Block
          </Link>
        </li>
        <li>
          <Link className="link" to="/Blockchain">
            Blockchain
          </Link>
        </li>
        <li>
          <Link className="link" to="/Distributed">
            Distributed
          </Link>
        </li>
        <li>
          <Link className="link" to="/Tokens">
            Tokens
          </Link>
        </li>
        <li>
          <Link className="link" to="/Coinbase">
            Coinbase
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Links;
