import React, { useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import Camera from "./Camera";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default class ModelViewer {
  constructor() {
    // Global access
    window.modelViewer = this;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();

    // Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });

    //Viewer creation
    const viewerRef = useRef();
    const canvasRef = useRef()
    useEffect(() => {
      const canvas = document.getElementById("local-ifc-container");
      const viewerAPI = new IfcViewerAPI({ container: canvas });
      viewerAPI.addAxes();
      viewerAPI.addGrid();
      viewerAPI.IFC.setWasmPath("../../files/");
      viewerRef.current = viewerAPI;
      canvasRef.current = canvas
      this.canvas = canvasRef
      this.viewer = viewerRef
    }, []);


    // IfcViewer creation - OLD
    // const viewerRef = useRef();
    // useEffect(() => {
    //   const container = document.getElementById("local-ifc-container");
    //   const viewerAPI = new IfcViewerAPI({ container });
    //   viewerAPI.addAxes();
    //   viewerAPI.addGrid();
    //   viewerAPI.IFC.setWasmPath("../../files/");
    //   viewerRef.current = viewerAPI;
    // }, []);

    console.log("ModelViewer created!");
  }

  resize() {}

  update() {}

  render() {
    return (
      <div
        // id="local-ifc-container"
        style={{
          position: "relative",
          height: "80vh",
          width: "80vw",
        }}
      >
        Esto deberia ser un canvas
      </div>
    );
  }
}
