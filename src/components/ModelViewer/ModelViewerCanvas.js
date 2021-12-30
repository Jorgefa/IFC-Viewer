import React from "react";
import ModelViewer from "./ModelViewer";

export default function ModelViewerCanvas() {
  const modelViewer = new ModelViewer();

  return       (<div
    id="local-ifc-container"
    style={{
      position: "relative",
      height: "80vh",
      width: "80vw",
    }}/>);
  }