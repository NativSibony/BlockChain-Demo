import React from "react";
import TokensComponent from "./TokensComponent";
import ClipLoader from "react-spinners/ClipLoader";

function Tokens({ tokens, mineURL }) {
  return (
    <>
      <div className="tokens">
        {tokens ? (
          tokens.map((c, i) => (
            <div key={i}>
              <TokensComponent
                index={i + 1}
                row={1}
                tokens={c}
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
      <div className="tokens">
        {tokens ? (
          tokens.map((c, i) => (
            <div key={i}>
              <TokensComponent
                index={i + 1}
                row={2}
                tokens={c}
                mineURL={mineURL}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="tokens">
        {tokens ? (
          tokens.map((c, i) => (
            <div key={i}>
              <TokensComponent
                index={i + 1}
                row={3}
                tokens={c}
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

export default Tokens;
