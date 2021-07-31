import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import $ from "jquery";

export default function CoinbaseComponent({ index, row, coinbase, mineURL }) {
  const [hash, setHash] = useState("");
  const [prevHash, setPrevHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [blockData, setBlockData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBlockNumber(coinbase.index);
    setHash(coinbase.hash);
    setNonce(coinbase.nonce);
    setPrevHash(coinbase.previousHash);
    setBlockData(coinbase.data);
  }, [coinbase]);

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
    if (
      e.target.parentNode.parentNode.id ===
      "block-data-" + index + "-row-" + row
    ) {
      handleBlockData(e.target.name, e.target.id, e.target.value);
    } else if (e.target.id === "nonce-" + index + "-row-" + row)
      setNonce(value);
    else setBlockNumber(value);

    updatetokens(index);
  };

  const handleBlockData = (name, i, value) => {
    let obj = blockData;
    obj[i][name] =
      name === "amount"
        ? parseInt(value)
        : name === "base"
        ? parseInt(value)
        : value;
    setBlockData(obj);

    $("#block-data-" + index + "-row-" + row).attr("name", JSON.stringify(obj));
  };

  const updatetokens = (index) => {
    for (var x = index; x <= 3; x++) {
      if (x > 1) {
        $("#prev-hash-" + x + "-row-" + row).val(
          $("#hash-" + (x - 1) + "-row-" + row).val()
        );
      }
      updateHash(
        x,
        $("#prev-hash-" + x + "-row-" + row).val(),
        $("#nonce-" + x + "-row-" + row).val(),
        $("#block-data-" + x + "-row-" + row).attr("name")
      );
    }
  };

  const updateHash = (num, prev, nce, bdata) => {
    // update the SHA256 hash value for this block
    $("#hash-" + num + "-row-" + row).val(
      sha256(
        parseInt($("#block-num-" + num + "-row-" + row).val()) +
          String(prev) +
          parseInt(nce) +
          bdata
      ).toString()
    );
    updateState(num);
  };

  const updateState = (num) => {
    // set the well background red or green for this block
    if (
      $("#hash-" + num + "-row-" + row)
        .val()
        .substr(0, 4) === "0000"
    ) {
      $("#success" + num + "-row-" + row).removeClass(" error");
    } else {
      $("#success" + num + "-row-" + row).addClass(" error");
    }
  };

  const fixeValues = () => {
    setHash($("#hash-" + index + "-row-" + row).val());
    setPrevHash($("#prev-hash-" + index + "-row-" + row).val());
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fixeValues();
    // console.log(blockNumber, JSON.stringify(blockData), prevHash);
    axios
      .get(
        `${mineURL}?num=${blockNumber}&data=${JSON.stringify(
          blockData
        )}&prev=${String(
          $("#prev-hash-" + index + "-row-" + row).val()
        )}&coinbase=1`
      )
      .then((res) => {
        const data = res.data;
        setHash(data.hash);
        setNonce(data.nonce);
        setLoading(false);
        updatetokens(index);
      });
  };

  return (
    <div className="content">
      <div className="group">
        <div className="card" id={"success" + index + "-row-" + row}>
          <form className="hash-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="group">
                <label htmlFor={"block-num-" + index + "-row-" + row}>
                  Block
                </label>
                <input
                  type="number"
                  id={"block-num-" + index + "-row-" + row}
                  value={blockNumber}
                  className="basic-input"
                  onChange={handleChangedFields}
                ></input>
              </div>
              <div className="group">
                <label htmlFor={"nonce-" + index + "-row-" + row}>Nonce</label>
                <input
                  className="basic-input"
                  type="number"
                  id={"nonce-" + index + "-row-" + row}
                  onChange={handleChangedFields}
                  value={nonce}
                ></input>
              </div>
              <div className="group">
                <label htmlFor={"block-tokens-" + index + "-row-" + row}>
                  TX
                </label>
                <div
                  className="small-group"
                  id={"block-data-" + index + "-row-" + row}
                  onChange={handleChangedFields}
                  name={JSON.stringify(blockData)}
                >
                  {Object.values(blockData).map((d, i) =>
                    d.amount ? (
                      <div key={i} className="small-group-group">
                        <label className="lbl-gray">$</label>
                        <input
                          type="number"
                          name="amount"
                          id={i}
                          className="basic-input"
                          defaultValue={d.amount}
                        ></input>
                        <label className="lbl-gray">From</label>
                        <input
                          type="text"
                          name="from"
                          id={i}
                          className="basic-input"
                          defaultValue={d.from}
                        ></input>
                        <label className="lbl-gray">{"->"}</label>
                        <input
                          type="text"
                          name="to"
                          id={i}
                          className="basic-input"
                          defaultValue={d.to}
                        ></input>
                      </div>
                    ) : (
                      <div key={i} className="small-group-group">
                        <label className="lbl-gray">$</label>
                        <input
                          type="number"
                          name="base"
                          id={i}
                          className="basic-input"
                          defaultValue={d.base}
                        ></input>
                        <label className="lbl-gray">{"->"}</label>
                        <input
                          type="text"
                          name="to"
                          id={i}
                          className="basic-input"
                          defaultValue={d.to}
                        ></input>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="group">
                <label htmlFor={"prev-hash-" + index + "-row-" + row}>
                  Prev
                </label>
                <input
                  className="prev-hash"
                  id={"prev-hash-" + index + "-row-" + row}
                  type="text"
                  defaultValue={prevHash}
                  disabled
                ></input>
              </div>
              <div className="group">
                <label htmlFor={"hash-" + index + "-row-" + row}>Hash</label>
                <input
                  className="hash"
                  id={"hash-" + index + "-row-" + row}
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
