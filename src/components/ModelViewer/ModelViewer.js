import React, { useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import Camera from "./Camera";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

let instance = null;

export default class ModelViewer {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    // Global access
    window.modelViewer = this;

    // Setup subcomponents
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

    // After render
    // Viewer creation
    // Create ref components
    const ifcViewerAPIRef = useRef();
    const canvasRef = useRef();
    // Create viewer after render
    useEffect(() => {
      const canvas = document.querySelector("div.webgl");
      const viewerAPI = new IfcViewerAPI({ container: canvas });
      viewerAPI.addAxes();
      viewerAPI.addGrid();
      viewerAPI.IFC.setWasmPath("../../files/");
      ifcViewerAPIRef.current = viewerAPI;
      canvasRef.current = canvas;
    }, []);

    // Setup subcomponents after renderer
    useEffect(() => {
      this.canvas = canvasRef.current;
      this.ifcViewerAPI = ifcViewerAPIRef.current;
      this.camera = this.ifcViewerAPI.context.ifcCamera.activeCamera;
      this.renderer = this.ifcViewerAPI.context.ifcRenderer.renderer;
    }, []);
  }
  resize() {
    console.log(this.camera);
    // Resize renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

    // Resize camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
  }
  update() {}
  render() {
    return <h1>Hello from model viewer!</h1>;
  }
}
