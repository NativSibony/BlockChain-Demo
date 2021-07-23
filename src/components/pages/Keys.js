import React, { useEffect, useState } from "react";

var EC = require("elliptic").ec;
var ec = new EC("secp256k1");

function Keys() {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    let keypair = ec.genKeyPair();
    setPrivateKey(keypair.getPrivate("hex"));
    setPublicKey(keypair.getPublic("hex"));
  }, []);

  const handleUpdate = (e) => {
    let value = e.target.value === "" ? 1 : e.target.value;
    let keypair = ec.keyFromPrivate(value);
    setPrivateKey(keypair.getPrivate("hex"));
    setPublicKey(keypair.getPublic("hex"));
  };

  const handleRandom = (e) => {
    e.preventDefault();
    let keypair = ec.genKeyPair();
    setPrivateKey(keypair.getPrivate("hex"));
    setPublicKey(keypair.getPublic("hex"));
  };

  return (
    <div className="content">
      <div className="group column">
        <div className="title">
          <h4>Public / Private Key Pairs</h4>
        </div>
        <div className="card">
          <form className="hash-form">
            <div
              className="form-group"
              style={{ minWidth: "600px", minHeight: "200px" }}
            >
              <label>Private Key</label>
              <input
                type="number"
                className="basic-input"
                onChange={handleUpdate}
                placeholder={privateKey}
                style={{ maxHeight: "40px" }}
              ></input>
              <label type="number">Public Key</label>
              <input
                type="text"
                className="private-key"
                placeholder={publicKey}
                style={{ maxHeight: "40px" }}
                disabled
              ></input>
              <button type="submit" className="mine" onClick={handleRandom}>
                Random
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Keys;
