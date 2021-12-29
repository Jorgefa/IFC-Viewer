import React, { useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default class ModelViewer {
  constructor() {
    // Global access
    window.modelViewer = this;

    // Options
    // this.canvas = canvas

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

    // console.log(this.time);

    // IfcViewer creation
    const viewerRef = useRef();
    useEffect(() => {
      const container = document.getElementById("local-ifc-container");
      const viewerAPI = new IfcViewerAPI({ container });
      viewerAPI.addAxes();
      viewerAPI.addGrid();
      viewerAPI.IFC.setWasmPath("../../files/");
      viewerRef.current = viewerAPI;
    }, []);

    console.log("ModelViewer created!");
  }

  resize() {}

  update() {}

  render() {
    return (
      <div
        id="local-ifc-container"
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
