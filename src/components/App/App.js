import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ModelViewerCanvas from "../ModelViewer/ModelViewerCanvas"
import IfcLoadExample from "../IfcLoaders/IfcLoadExample.js";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>

            <li>
              <Link to="/viewer">Viewer</Link>
            </li>
            <li>
              <input type="file" id="file-input" />
            </li>
          </ul>
          <ul>
            <li>
              <p onClick={IfcLoadExample} >Add example</p>
            </li>
            <li>
              <p>Add model</p>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/test" element={<IfcLoadExample />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/" element={<ModelViewerCanvas />} /> 
        </Routes>
      </div>
    </Router>
  );
}

function Test() {
  return <h2>Test</h2>;
}

function Viewer() {
  return <h2>Viewer</h2>;
}