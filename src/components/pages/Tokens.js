import React from "react";
import TokensComponent from "./TokensComponent";
import ClipLoader from "react-spinners/ClipLoader";

function Tokens({ tokens, mineURL }) {
  return (
    <div className="tokens">
      {tokens ? (
        tokens.map((c, i) =>
          i === 0 ? (
            <div key={i} style={{ display: "none" }}></div>
          ) : (
            <div key={i}>
              <TokensComponent index={i + 1} tokens={c} mineURL={mineURL} />
            </div>
          )
        )
      ) : (
        <div className="spinner">
          <ClipLoader color={"#25373b"} size={55} />
        </div>
      )}
    </div>
  );
}

export default Tokens;
