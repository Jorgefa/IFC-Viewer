import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

export default function IfcLoadLocalFile(props) {
  const loadInputButton = useRef();

  const addLocalFile = () => {

    const curIfcViewerAPI = props.ifcViewerAPI
    loadInputButton.current = document.getElementById("openFileDialog");

    loadInputButton.current.click();

    loadInputButton.current.onchange = async (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      const model = await curIfcViewerAPI.current.IFC.loadIfcUrl(url);
      // ifcTree = viewer.IFC.getSpatialStructure(model.modelID); //////////////////////////////////////// CHECK THIS
      // console.log(ifcTree);
    };
  };

  return (
    <Nav.Item>
      <input readOnly type="file" id="openFileDialog" style={{visibility: "collapse"}} />
      <p onClick={addLocalFile}>Add local file</p>
    </Nav.Item>
  );
}
