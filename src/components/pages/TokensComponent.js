import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import $ from "jquery";

export default function TokensComponent({ index, tokens, mineURL }) {
  const [hash, setHash] = useState("");
  const [prevHash, setPrevHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [blockData, setBlockData] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [transactions, setTransactions] = useState("");

  useEffect(() => {
    setBlockNumber(tokens.index);
    setHash(tokens.hash);
    setNonce(tokens.nonce);
    setPrevHash(tokens.previousHash);
    setBlockData(tokens.data);
    // setTransactions(tokens.data);
  }, [tokens]);

  useEffect(() => {
    setHash(
      sha256(
        parseInt(blockNumber) +
          prevHash +
          parseInt(nonce) +
          JSON.stringify(blockData)
      ).toString()
    );
  }, [blockNumber, nonce, blockData, prevHash]);

  const handleChangedFields = (e) => {
    let value = e.target.value;
    if (e.target.id === "block-data-" + index) setBlockData(value ? value : "");
    else if (e.target.id === "nonce-" + index) setNonce(value);
    else setBlockNumber(value);

    updatetokens(index);
  };

  const updatetokens = (index) => {
    for (var x = index; x <= 5; x++) {
      if (x > 1) {
        $("#prev-hash-" + x).val($("#hash-" + (x - 1)).val());
      }
      updateHash(
        x,
        $("#prev-hash-" + x).val(),
        $("#nonce-" + x).val(),
        $("#block-data-" + x).val()
      );
    }
  };

  const updateHash = (num, prev, nce, bdata) => {
    // update the SHA256 hash value for this block
    $("#hash-" + num).val(
      sha256(
        parseInt(num) + String(prev) + parseInt(nce) + JSON.stringify(bdata)
      ).toString()
    );
    updateState(num);
  };

  const updateState = (num) => {
    // set the well background red or green for this block
    if (
      $("#hash-" + num)
        .val()
        .substr(0, 4) === "0000"
    ) {
      $("#success" + num).removeClass(" error");
    } else {
      $("#success" + num).addClass(" error");
    }
  };

  const fixeValues = () => {
    setHash($("#hash-" + index).val());
    setPrevHash($("#prev-hash-" + index).val());
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fixeValues();
    console.log(blockNumber, JSON.stringify(blockData), prevHash);
    axios
      .get(
        `${mineURL}?num=${blockNumber}&data=${blockData}&prev=${String(
          $("#prev-hash-" + index).val()
        )}`
      )
      .then((res) => {
        const data = res.data;
        setHash(data.hash);
        setNonce(data.nonce);
        setLoading(false);
        updatetokens(index);
      });
  };
  if (tokens.data === "") return <div style={{ display: "none" }}></div>;
  return (
    <div className="content">
      <div className="group">
        <div className="card" id={"success" + index}>
          <form className="hash-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="group">
                <label htmlFor={"block-num-" + index}>Block</label>
                <input
                  type="number"
                  id={"block-num-" + index}
                  value={blockNumber}
                  className="basic-input"
                  onChange={handleChangedFields}
                ></input>
              </div>
              <div className="group">
                <label htmlFor={"nonce-" + index}>Nonce</label>
                <input
                  className="basic-input"
                  type="number"
                  id={"nonce-" + index}
                  onChange={handleChangedFields}
                  value={nonce}
                ></input>
              </div>
              <div className="group">
                <label htmlFor={"block-tokens-" + index}>TX</label>
                <div className="small-group">
                  {Object.values(blockData).map((d, i) => (
                    <div key={i} className="small-group-group">
                      <label className="lbl-gray">$</label>
                      <input
                        type="number"
                        className="basic-input"
                        defaultValue={d.amount}
                      ></input>
                      <label className="lbl-gray">From</label>
                      <input
                        type="text"
                        className="basic-input"
                        defaultValue={d.from}
                      ></input>
                      <label className="lbl-gray">To</label>
                      <input
                        type="text"
                        className="basic-input"
                        defaultValue={d.to}
                      ></input>
                    </div>
                  ))}
                  {/* <div className="small-group-group">
                    <label className="lbl-gray">$</label>
                    <input type="text" className="basic-input"></input>
                    <label className="lbl-gray">From</label>
                    <input type="text" className="basic-input"></input>
                    <label className="lbl-gray">To</label>
                    <input type="text" className="basic-input"></input>
                  </div> */}
                </div>
              </div>
              <div className="group">
                <label htmlFor={"prev-hash-" + index}>Prev</label>
                <input
                  className="prev-hash"
                  id={"prev-hash-" + index}
                  type="text"
                  defaultValue={prevHash}
                  disabled
                ></input>
              </div>
              <div className="group">
                <label htmlFor={"hash-" + index}>Hash</label>
                <input
                  className="hash"
                  id={"hash-" + index}
                  type="text"
                  defaultValue={hash}
                  disabled
                ></input>
              </div>
              <div>
                <button type="submit" className="mine">
                  {loading ? "" : "Mine"}
                  <ClipLoader color={"#25373b"} loading={loading} size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
