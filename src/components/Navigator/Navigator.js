import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import IfcLoadExample from "../ModelViewer/IfcLoaders/IfcLoadExample.js";

export default function Navigator() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <nav>
        <div>
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/test">Test</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/viewer">Viewer</Link>
          </Nav.Item>
        </div>
        <div>
          <Nav.Item>
            <input type="file" id="file-input" />
          </Nav.Item>
          <Nav.Item>
            <p onClick={IfcLoadExample}>Add example</p>
          </Nav.Item>
          <Nav.Item>
            <p>Add model</p>
          </Nav.Item>
        </div>
      </nav>
    </Nav>
  );
}
