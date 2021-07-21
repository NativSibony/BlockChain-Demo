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

const mineURL = "http://localhost:3001/mine";
const chainURL = "http://localhost:3001/chain";
const tokensURL = "http://localhost:3001/tokens";
const mineTokenURL = "http://localhost:3001/mineToken";
const coinbaseURL = "http://localhost:3001/coinbase";

function Main() {
  const [chain, setChain] = useState("");
  const [tokens, setTokens] = useState("");
  const [coinbase, setCoinbase] = useState("");

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
              <Tokens tokens={tokens} mineTokenURL={mineTokenURL} />
            </Route>
            <Route path="/Coinbase">
              <Coinbase coinbase={coinbase} mineTokenURL={mineTokenURL} />
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
