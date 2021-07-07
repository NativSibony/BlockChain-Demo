import React from "react";

function Block() {
  const handleHash = () => {};
  return (
    <div className="content">
      <div className="group">
        <div className="title">
          <h4>SHA256 Hash</h4>
        </div>
        <div className="card">
          <form className="hash-form">
            <div className="form-group">
              <label>Block</label>
              <input id="basic-input" type="number" defaultValue="1"></input>
              <label>Nonce</label>
              <input
                id="basic-input"
                type="number"
                defaultValue="72608"
              ></input>
              <label>Data</label>
              <textarea rows="10" cols="70"></textarea>
              <label>Hash</label>
              <input id="hash" type="text" disabled></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Block;
