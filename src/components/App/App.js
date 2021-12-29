import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IfcViewer from "../IfcViewer/IfcViewer.js";
import Test from "../ModelViewer/Testing"

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
          <Route path="/test" element={<Test />} />
          <Route path="/viewer" element={<IfcViewer />} />
          <Route path="/" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }