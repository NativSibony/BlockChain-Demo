import React from "react";
import BlokchainComponent from "./BlokchainComponent";
import ClipLoader from "react-spinners/ClipLoader";

function Distributed({ chain, mineURL }) {
  return (
    <div className="distributed">
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
      <div className="blockchain">
        {chain ? (
          Object.values(chain).map((c, i) => (
            <div key={i}>
              <BlokchainComponent
                index={i + 1}
                row={2}
                chain={c}
                mineURL={mineURL}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="blockchain">
        {chain ? (
          Object.values(chain).map((c, i) => (
            <div key={i}>
              <BlokchainComponent
                index={i + 1}
                row={3}
                chain={c}
                mineURL={mineURL}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Distributed;
