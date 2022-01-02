import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import IfcLoadExample from "../ModelViewer/IfcLoaders/IfcLoadExample.js";
import SectionTools from "./SecctionTools.js";

export default function ModelViewerTools(props) {
  return (
    <div>
      <Nav.Item>
        <input type="file" id="file-input" />
      </Nav.Item>
      <Nav.Item>
        <IfcLoadExample ifcViewerAPI={props.ifcViewerAPI} />
      </Nav.Item>
      <Nav.Item>
        <SectionTools  ifcViewerAPI={props.ifcViewerAPI} />
      </Nav.Item>
      <Nav.Item>
        <p>Show project tree</p>
      </Nav.Item>
      <Nav.Item>
        <p>Show element properties</p>
      </Nav.Item>
    </div>
  );
}
