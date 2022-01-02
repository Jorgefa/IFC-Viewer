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
      </nav>
    </Nav>
  );
}
