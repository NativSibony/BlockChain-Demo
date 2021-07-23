import React, { useEffect, useState } from "react";

var EC = require("elliptic").ec;
var ec = new EC("secp256k1");

function Signature() {
  const [keyPair, setKeyPair] = useState("");
  const [message, setMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [messageHash, setMessageHash] = useState("");
  const [isBad, setIsBad] = useState(false);

  useEffect(() => {
    const kp = ec.genKeyPair();
    setKeyPair(kp);
    setPrivateKey(kp.getPrivate("hex"));
    setPublicKey(kp.getPublic("hex"));
  }, []);

  const handleUpdate = (e) => {
    let value = e.target.value === "" ? 1 : e.target.value;
    let keyPair = ec.keyFromPrivate(value);
    setPrivateKey(keyPair.getPrivate("hex"));
    setPublicKey(keyPair.getPublic("hex"));
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSign = (e) => {
    const s = keyPair.sign(message);
    e.preventDefault();
    setMessageHash(Buffer.from(s.toDER()).toString("hex"));
    setSignature(s.toDER());
  };

  const handleVerify = (e) => {
    e.preventDefault();
    signature
      ? keyPair.verify(message, signature)
        ? setIsBad(false)
        : setIsBad(true)
      : setIsBad(true);
  };

  return (
    <div className="content">
      <div className="group column">
        <div className="title">
          <h4>Public / Private Key Pairs</h4>
        </div>
        <div className={isBad ? "card error" : "card"}>
          <form className="hash-form">
            <div
              className="form-group"
              style={{ minWidth: "600px", minHeight: "200px", rowGap: "5px" }}
            >
              <label>Message</label>
              <textarea
                id="signMessage"
                rows="5"
                cols="70"
                onChange={handleMessage}
              ></textarea>
              <label type="number">Private Key</label>
              <input
                type="number"
                className="basic-input"
                onChange={handleUpdate}
                placeholder={privateKey}
                style={{ maxHeight: "40px" }}
              ></input>
              <button type="submit" className="mine" onClick={handleSign}>
                Sign
              </button>
              <label type="number">Public Key</label>
              <input
                type="text"
                className="basic-input"
                onChange={handleUpdate}
                placeholder={publicKey}
                style={{ maxHeight: "40px" }}
              ></input>
              <label type="number">Signature</label>
              <input
                type="text"
                className="basic-input"
                onChange={handleUpdate}
                placeholder={messageHash}
                style={{ maxHeight: "40px" }}
              ></input>
              <button type="submit" className="mine" onClick={handleVerify}>
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signature;
