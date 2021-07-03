import React from "react";
import Header from "../partials/Header.js";
import Footer from "../partials/Footer.js";
import Hash from "../pages/Hash.js";
import Home from "../pages/Home.js";
import Block from "../pages/Block.js";
import Coinbase from "../pages/Coinbase.js";
import Blockchain from "../pages/Blockchain.js";
import Distributed from "../pages/Distributed.js";
import Tokens from "../pages/Tokens.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function Main() {
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
              <Block />
            </Route>
            <Route path="/Blockchain">
              <Blockchain />
            </Route>
            <Route path="/Distributed">
              <Distributed />
            </Route>
            <Route path="/Coinbase">
              <Coinbase />
            </Route>
            <Route path="/Tokens">
              <Tokens />
            </Route>
            <Route path="/">
              <Home />
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
