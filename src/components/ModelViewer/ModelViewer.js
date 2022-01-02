import React, { Component, useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import Camera from "./Camera";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

let instance = null;

export default class ModelViewer extends Component {
  constructor() {

    super() 

      // In order to be able to access modelViewer props in other places, check if there is already a modelViewer created, if yes, keep ot. If not, create another one.
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access. Maybe not necesary.
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
    // Resize renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    // Resize camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update() {}

}
