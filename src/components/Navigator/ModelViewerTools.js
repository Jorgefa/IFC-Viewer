import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import IfcLoadExample from "../ModelViewer/IfcLoaders/IfcLoadExample.js";
import SectionTools from "./SecctionTools.js";
import IfcLoadLocalFile from "../ModelViewer/IfcLoaders/IfcLoadLocalFile";
import { Color, Fog, AxesHelper, MeshBasicMaterial } from "three";

export default function ModelViewerTools(props) {
  // const fogNear = 5;
  // const fogFar = 50;
  // const fog = new Fog("#eeeeee", fogNear, fogFar);
  // // scene.fog = fog;

  // General

  // toogleFog
  let fogStatus;
  let curFog
  const noFog = new Fog("#eeeeee", 10000, 10000);

  const toggleFog = () => {
    const curScene = props.ifcViewerAPI.current.context.ifcScene.scene;
    switch (fogStatus) {
      case 1:
        curScene.fog = noFog;
        fogStatus = 2;
        break;
      case 2:
        curScene.fog = curFog;
        fogStatus = 1;
        break;
      default:
        curFog = curScene.fog;
        curScene.fog = noFog;
        fogStatus = 2;
        break;
    }
  };

  return (
    <div>
      <IfcLoadLocalFile ifcViewerAPI={props.ifcViewerAPI} />
      <Nav.Item>
        <IfcLoadExample ifcViewerAPI={props.ifcViewerAPI} />
      </Nav.Item>
      <Nav.Item>
        <SectionTools ifcViewerAPI={props.ifcViewerAPI} />
      </Nav.Item>
      <Nav.Item>
        <p>Show project tree</p>
      </Nav.Item>
      <Nav.Item>
        <p>Show element properties</p>
      </Nav.Item>
      <Nav.Item>
        <p onClick={toggleFog}>Toggle fog</p>
      </Nav.Item>
    </div>
  );
}
