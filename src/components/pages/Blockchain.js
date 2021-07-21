import React from "react";
import BlokchainComponent from "./BlokchainComponent";
import ClipLoader from "react-spinners/ClipLoader";

function Blockchain({ chain, mineURL }) {
  return (
    <div className="blockchain">
      {chain ? (
        Object.values(chain).map((c, i) => (
          <div key={i}>
            <BlokchainComponent
              index={i + 1}
              row={1}
              chain={c}
              mineURL={mineURL}
            />
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
