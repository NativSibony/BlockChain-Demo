import React, { useState, useEffect } from "react";
import Header from "../partials/Header.js";
import Footer from "../partials/Footer.js";
import Hash from "../pages/Hash.js";
// import Home from "../pages/Home.js";
import Block from "../pages/Block.js";
import Coinbase from "../pages/Coinbase.js";
import Blockchain from "../pages/Blockchain.js";
import Distributed from "../pages/Distributed.js";
import Tokens from "../pages/Tokens.js";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Keys from "../pages/Keys.js";
import Signature from "../pages/Signature.js";
import Transaction from "../pages/Transaction.js";
import FinalBlockchain from "../pages/FinalBlockchain.js";

const mineURL = "http://localhost:3001/mine";
const chainURL = "http://localhost:3001/chain";
const tokensURL = "http://localhost:3001/tokens";
const coinbaseURL = "http://localhost:3001/coinbase";
const finalURL = "http://localhost:3001/final";

function Main() {
  const [chain, setChain] = useState("");
  const [tokens, setTokens] = useState("");
  const [coinbase, setCoinbase] = useState("");
  const [final, setFinal] = useState("");

  useEffect(() => {
    axios.get(`${chainURL}`).then((res) => {
      const data = res.data.chain;
      setChain(data);
    });
    axios.get(`${tokensURL}`).then((res) => {
      const data = res.data;
      setTokens(data.chain);
    });
    axios.get(`${coinbaseURL}`).then((res) => {
      const data = res.data;
      setCoinbase(data.chain);
    });
    axios.get(`${finalURL}`).then((res) => {
      const data = res.data;
      setFinal(data.chain);
    });
  }, []);

  return (
    <div className="main">
      <div className="wrapper">
        <Router>
          {/* Header With Links */}
          <Header />
          {/* Route Controller */}
          <Switch>
            <Route path="/Hash">
              <Hash />
            </Route>
            <Route path="/Block">
              <Block mineURL={mineURL} prev={"0"} />
            </Route>
            <Route path="/Blockchain">
              <Blockchain chain={chain} mineURL={mineURL} />
            </Route>
            <Route path="/Distributed">
              <Distributed chain={chain} mineURL={mineURL} />
            </Route>
            <Route path="/Tokens">
              <Tokens tokens={tokens} mineURL={mineURL} />
            </Route>
            <Route path="/Coinbase">
              <Coinbase coinbase={coinbase} mineURL={mineURL} />
            </Route>
            <Route path="/Keys">
              <Keys />
            </Route>
            <Route path="/Signature">
              <Signature />
            </Route>
            <Route path="/Transaction">
              <Transaction />
            </Route>
            <Route path="/FinalBlockchain">
              <FinalBlockchain final={final} mineURL={mineURL} />
            </Route>
            <Route path="/">
              <Hash />
              {/* <Home /> */}
            </Route>
          </Switch>
        </Router>
        {/* Web Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Main;
