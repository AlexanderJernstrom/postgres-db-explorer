import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Database } from "./Database/Database";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="database/:databaseName" element={<Database />} />
      </Routes>
    </Router>
  );
};

function render() {
  ReactDOM.render(<Index />, document.getElementById("root"));
}
render();
