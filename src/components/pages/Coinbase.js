import React from "react";
import CoinbaseComponent from "./CoinbaseComponent";
import ClipLoader from "react-spinners/ClipLoader";

function Coinbase({ coinbase, mineURL }) {
  return (
    <>
      <div className="coinbase">
        {coinbase ? (
          coinbase.map((c, i) => (
            <div key={i}>
              <CoinbaseComponent
                index={i + 1}
                row={1}
                coinbase={c}
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
        {coinbase ? (
          coinbase.map((c, i) => (
            <div key={i}>
              <CoinbaseComponent
                index={i + 1}
                row={2}
                coinbase={c}
                mineURL={mineURL}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="coinbase">
        {coinbase ? (
          coinbase.map((c, i) => (
            <div key={i}>
              <CoinbaseComponent
                index={i + 1}
                row={3}
                coinbase={c}
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

export default Coinbase;
