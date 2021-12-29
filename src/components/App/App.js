import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IfcLoadExample from "../IfcLoaders/IfcLoadExample";
import IfcViewer from "../IfcViewer/IfcViewer.js";

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
              <Link to="/about">About</Link>
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
              <p>Add example</p>
            </li>
            <li>
              <p>Add model</p>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/viewer" element={<IfcViewer />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
