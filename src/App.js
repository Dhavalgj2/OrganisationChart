import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import EditNode from "./edit-node/edit-node";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Route path="/" component={EditNode} />
      </div>
    </Router>
  );
};

export default App;
