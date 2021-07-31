import React, { useEffect, useState } from "react";
var EC = require("elliptic").ec;
var ec = new EC("secp256k1");

function Transaction() {
  const [keyPair, setKeyPair] = useState("");
  const [message, setMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [messageHash, setMessageHash] = useState("");
  const [amount, setAmount] = useState(20.0);
  const [to, setTo] = useState("");
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

  const handleAmount = (e) => {
    setAmount(e.target.value);
    handleMessage(e.target.value, publicKey, to);
  };

  const handleTo = (e) => {
    setTo(e.target.value);
    handleMessage(amount, publicKey, e.target.value);
  };

  const handlePublicKey = (e) => {
    setPublicKey(e.target.value);
    handleMessage(amount, e.target.value, to);
  };

  const handleMessage = (amount, pKey, to) => {
    let a = [amount, pKey, to];
    setMessage(a);
  };

  const handleSign = (e) => {
    e.preventDefault();
    const s = keyPair.sign(message);

    console.log(message, keyPair.sign(message));
    console.log(Buffer.from(s.toDER()).toString("hex"));

    setMessageHash(Buffer.from(s.toDER()).toString("hex"));
    setSignature(s.toDER());
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const s = keyPair.sign(message);
    s.toDER() !== signature
      ? keyPair.verify(message, signature)
        ? setIsBad(false)
        : setIsBad(true)
      : setIsBad(true);
  };

  return (
    <div className="content">
      <div className="group column">
        <div className="title">
          <h4>Transaction</h4>
        </div>
        <div className={isBad ? "card error" : "card"}>
          <form className="hash-form">
            <div
              className="form-group"
              style={{ minWidth: "600px", minHeight: "200px", rowGap: "5px" }}
            >
              <label>Message</label>
              <div className="small-group-group">
                <label className="lbl-gray">$</label>
                <input
                  type="number"
                  name="amount"
                  className="basic-input"
                  value={amount}
                  onChange={handleAmount}
                ></input>
                <label className="lbl-gray">From</label>
                <input
                  type="text"
                  name="from"
                  className="basic-input"
                  value={publicKey}
                  onChange={handlePublicKey}
                ></input>
                <label className="lbl-gray">{"->"}</label>
                <input
                  type="text"
                  name="to"
                  id="to"
                  className="basic-input"
                  value={to}
                  onChange={handleTo}
                ></input>
              </div>
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
              <label type="number">Signature</label>
              <input
                type="text"
                className="private-key"
                onChange={handleUpdate}
                placeholder={messageHash}
                style={{ maxHeight: "40px" }}
                disabled
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

export default Transaction;
