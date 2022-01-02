import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ModelViewer from "../ModelViewer/ModelViewer";
import Navigator from "../Navigator/Navigator";

export default function App() {
  return (
    <Fragment>
      <Router>
        <div>
          <Navigator />

          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/viewer" element={<ModelViewer />} />
            <Route path="/" element={<ModelViewer />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

function Test() {
  return <h2>Test</h2>;
}
