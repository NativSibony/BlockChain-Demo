import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import sha256 from "crypto-js/sha256";
import axios from "axios";

function Block({ mineURL }) {
  const [hash, setHash] = useState("");
  const [blockNumber, setBlockNumber] = useState(1);
  const [nonce, setNonce] = useState(3087);
  const [blockData, setBlockData] = useState("");
  const [loading, setLoading] = useState(false);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    setHash(
      sha256(
        parseInt(blockNumber) + parseInt(nonce) + JSON.stringify(blockData)
      ).toString()
    );
  }, [blockNumber, nonce, blockData]);

  const handleChangedFields = (e) => {
    let value = e.target.value;
    let check;
    if (e.target.id === "blockData") {
      setBlockData(value ? value : "");
      check = sha256(
        parseInt(blockNumber) + parseInt(nonce) + JSON.stringify(value)
      ).toString();
    } else if (e.target.id === "nonce") {
      setNonce(value);
      check = sha256(
        parseInt(blockNumber) + parseInt(value) + JSON.stringify(blockData)
      ).toString();
    } else {
      setBlockNumber(value);
      check = sha256(
        parseInt(value) + parseInt(nonce) + JSON.stringify(blockData)
      ).toString();
    }
    if (check.substr(0, 4) !== "0000") setChanging(true);
    else setChanging(false);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .get(`${mineURL}?num=${blockNumber}&data=${JSON.stringify(blockData)}`)
      .then((res) => {
        const data = res.data;
        setHash(data.hash);
        setNonce(data.nonce);
        setLoading(false);
        setChanging(false);
      });
  };

  return (
    <div className="content">
      <div className="group column">
        <div className="title">
          <h4>SHA256 Hash</h4>
        </div>
        <div className={changing ? "card error" : "card"}>
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
                type="number"
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
              <input
                className="hash"
                type="text"
                placeholder={hash}
                disabled
              ></input>
              <button type="submit" className="mine">
                {loading ? "" : "Mine"}
                <ClipLoader color={"#25373b"} loading={loading} size={25} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Block;
