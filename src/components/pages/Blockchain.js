import React from "react";
import BlockchainBlock from "./BlockchainBlock";
import ClipLoader from "react-spinners/ClipLoader";

function Blockchain({ chain }) {
  //

  return (
    <div className="Blockchain">
      {chain ? (
        Object.values(chain).map((c, i) => (
          <BlockchainBlock chain={c} key={i} />
        ))
      ) : (
        <>
          <ClipLoader color={"#25373b"} size={55} />
        </>
      )}
    </div>
  );
}

export default Blockchain;
