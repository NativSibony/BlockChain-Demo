import React from "react";
import BlockchainBlock from "../pages/BlockchainBlock";
import ClipLoader from "react-spinners/ClipLoader";

function Blockchain({ chain, mineURL }) {
  return (
    <div className="Blockchain">
      {chain ? (
        Object.values(chain).map((c, i) => (
          <BlockchainBlock chain={c} mineURL={mineURL} key={i} />
        ))
      ) : (
        <div className="spinner">
          <ClipLoader color={"#25373b"} size={55} />
        </div>
      )}
    </div>
  );
}

export default Blockchain;
