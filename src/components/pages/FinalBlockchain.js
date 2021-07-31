import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FinalBlockComponent from "./FinalBlockchainComponent";

function FinalBlockchain({ final, mineURL }) {
  return (
    <>
      <div className="coinbase">
        {final ? (
          final.map((c, i) => (
            <div key={i}>
              <FinalBlockComponent
                index={i + 1}
                row={1}
                final={c}
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
      <div className="coinbase">
        {final ? (
          final.map((c, i) => (
            <div key={i}>
              <FinalBlockComponent
                index={i + 1}
                row={2}
                final={c}
                mineURL={mineURL}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="coinbase">
        {final ? (
          final.map((c, i) => (
            <div key={i}>
              <FinalBlockComponent
                index={i + 1}
                row={3}
                final={c}
                mineURL={mineURL}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default FinalBlockchain;
