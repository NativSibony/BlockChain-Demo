import React from "react";
import ChainBlock from "./ChainBlock";
import ClipLoader from "react-spinners/ClipLoader";

function Blockchain({ chain, mineURL }) {
  return (
    <div className="blockchain">
      {chain ? (
        Object.values(chain).map((c, i) => (
          <div key={i}>
            <ChainBlock index={i + 1} chain={c} mineURL={mineURL} />
          </div>
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
