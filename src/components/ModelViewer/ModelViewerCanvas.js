import React from "react";
import ModelViewer from "./ModelViewer";

export default function ModelViewerCanvas() {

  const modelViewer = new ModelViewer();

  return       (<div
    id="wegbgl-div"
    className="webgl"
    style={{
      position: "relative",
      height: "80vh",
      width: "80vw",
    }}/>);
  }
  