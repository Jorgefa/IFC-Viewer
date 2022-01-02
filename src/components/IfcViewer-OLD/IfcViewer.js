import React, { useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";

export default function IfcViewer() {

  const viewerRef = useRef();
  useEffect(() => {
    container = document.getElementById("local-ifc-container");
    const viewerAPI = new IfcViewerAPI({ container });
    viewerAPI.addAxes();
    viewerAPI.addGrid();
    viewerAPI.IFC.setWasmPath("../../files/");
    viewerRef.current = viewerAPI;
    console.log("Viewer created");

  }, []);

  return (
    <div
      id="local-ifc-container"
      style={{
        position: "relative",
        height: "80vh",
        width: "80vw",
      }}
    ></div>
  );
}