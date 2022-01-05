import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

export default function AddSection(props) {
  const curIfcViewerAPI = props.ifcViewerAPI;
  const addingSections = true;


  // Add     useEffect(() => {}


  const addSection = () => {
    if (addingSections) {
      window.ondblclick = async () => {
        console.log(curIfcViewerAPI.current);
        curIfcViewerAPI.current.clipper.createPlane();
      };
    }
  };

  const removeAllSections = () => {
    console.log(curIfcViewerAPI);
  };

  return (
    <Nav.Item>
      <p onClick={addSection}>Add section</p>
      <p onClick={removeAllSections}>Remove all sections</p>
    </Nav.Item>
  );
}
