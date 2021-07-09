import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";

function Hash() {
  const [sha, setSha] = useState("");

  useEffect(() => {
    let s = sha256("").toString();
    setSha(s);
  }, []);

  const handleHash = (e) => {
    let s = sha256(e.target.value).toString();
    setSha(s);
  };
  return (
    <div className="content">
      <div className="group">
        <div className="title">
          <h4>SHA256 Hash</h4>
        </div>
        <div className="card">
          <form className="hash-form">
            <div className="form-group">
              <label>Data</label>
              <textarea onChange={handleHash} rows="10" cols="70"></textarea>
              <label>Hash</label>
              <input id="hash" type="text" placeholder={sha} disabled></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hash;
