import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import sha256 from "crypto-js/sha256";
import axios from "axios";

function Block({ blockUrl }) {
  const [hash, setHash] = useState("");
  const [blockNumber, setBlockNumber] = useState(1);
  const [nonce, setNonce] = useState("42818");
  const [blockData, setBlockData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = blockData ? blockData : "{}";
    if (!loading) setHash(sha256(blockNumber * 2 + nonce + temp));
  }, [blockNumber, nonce, blockData]);

  const handleChangedFields = (e) => {
    let value = e.target.value;
    if (e.target.id === "blockData") setBlockData(value);
    else if (e.target.id === "nonce") setNonce(value);
    else setBlockNumber(value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .get(
        `${blockUrl}?num=${blockNumber}&data=${
          blockData ? JSON.stringify(blockData) : "{}"
        }`
      )
      .then((res) => {
        const data = res.data;
        setHash(data.hash);
        setNonce(data.nonce);
        setLoading(false);
      });
  };

  return (
    <div className="content">
      <div className="group">
        <div className="title">
          <h4>SHA256 Hash</h4>
        </div>
        <div className="card">
          <form className="hash-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Block</label>
              <input
                className="basic-input"
                type="number"
                id="blockIndex"
                onChange={handleChangedFields}
                value={blockNumber}
              ></input>
              <label>Nonce</label>
              <input
                className="basic-input"
                type="text"
                id="nonce"
                onChange={handleChangedFields}
                value={nonce}
              ></input>
              <label>Data</label>
              <textarea
                id="blockData"
                rows="10"
                cols="70"
                onChange={handleChangedFields}
                value={blockData}
              ></textarea>
              <label>Hash</label>
              <input id="hash" type="text" placeholder={hash} disabled></input>
              <button type="submit" className="mine">
                {loading ? "" : "Mine"}
                <ClipLoader color={"#25373b"} loading={loading} size={30} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Block;
