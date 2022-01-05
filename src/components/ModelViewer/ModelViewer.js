import React, { useEffect, useRef, useState } from "react";

import { IfcViewerAPI } from "web-ifc-viewer";
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

import Camera from "./Camera";
import IfcLoadExample from "./IfcLoaders/IfcLoadExample";
import ModelViewerTools from "../Navigator/ModelViewerTools";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import { Color, Fog, AxesHelper, MeshBasicMaterial } from "three";
import { render } from "react-dom";

export default function ModelViewer() {
  // TO CHECK const ifcModels = useSelector((state) => state.ifcModels.value);

  const ifcViewerAPIRef = useRef();
  const canvasRef = useRef();

  // Materials
  const materialColor = new Color(0xffffff);
  const basicMaterial = new MeshBasicMaterial();
  basicMaterial.color = materialColor;

  //Creates the Three.js scene
  useEffect(() => {
    // Set canvas and create IfcViewerAPI
    canvasRef.current = document.querySelector("div.webgl");
    ifcViewerAPIRef.current = new IfcViewerAPI({
      container: canvasRef.current,
      backgroundColor: new Color(0xeeeeee),
    });

    // Set Wasm Path (WebAssembly file location)
    ifcViewerAPIRef.current.IFC.setWasmPath("../../files/");

    // Set elements
    const scene = ifcViewerAPIRef.current.context.ifcScene.scene;

    // IFCjs IfcViewerAPI renderer
    const renderer = ifcViewerAPIRef.current.context.ifcRenderer.renderer;
    // renderer.setClearColor( 0xeeeeee, 0);
    // renderer.setClearAlpha(1)
    // console.log(renderer.getClearAlpha())

    // IFCjs IfcViewerAPI grid. addGrid = size?: number, divisions?: number, colorCenterLine?: Color, colorGrid?: Color
    ifcViewerAPIRef.current.addGrid(
      1000,
      1000,
      new Color(0xffffff),
      new Color(0xffffff)
    );

    // IFCjs IfcViewerAPI axes
    ifcViewerAPIRef.current.addAxes();
    0;
    const axesHelpers = scene.children.find((x) => x.type === "AxesHelper");
    axesHelpers.setColors(
      new Color(0xffffff),
      new Color(0xffffff),
      new Color(0xffffff)
    );

    // THREEjs scene configuration
    const fogNear = 5;
    const fogFar = 50;
    const fog = new Fog("#eeeeee", fogNear, fogFar);
    scene.fog = fog;
    // fog.name = "sceneFog"
    // scene.overrideMaterial = basicMaterial;

    // THREEjs controls configuration. Check to change to FP
    const camera = ifcViewerAPIRef.current.context.ifcCamera;
    // camera.setNavigationMode(1);


    // Onmouse preselector
    canvasRef.current.onmousemove = () =>
      ifcViewerAPIRef.current.IFC.prePickIfcItem();

    // DblClick selector
    canvasRef.current.ondblclick = async () => {
      const curObject = await ifcViewerAPIRef.current.IFC.pickIfcItem(true);
      if (curObject === null || curObject === undefined) return;
      const curObjectProps = await ifcViewerAPIRef.current.IFC.getProperties(
        curObject.modelID,
        curObject.id,
        true,
        true
      );
      console.log(curObjectProps);
    };

    // Testing /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // console.log(ifcViewerAPIRef.current);
    // console.log(camera);
  });

  // Setup subcomponents
  const sizes = new Sizes();
  const time = new Time();

  // Sizes resize event
  sizes.on("resize", () => {
    resize();
  });

  // Time tick event
  time.on("tick", () => {
    update();
  });

  const resize = () => {
    // console.log(sizes);
    // Resize renderer
    ifcViewerAPIRef.current.context.ifcRenderer.renderer.setSize(
      sizes.width,
      sizes.height
    );
    ifcViewerAPIRef.current.context.ifcRenderer.renderer.setPixelRatio(
      Math.min(sizes.pixelRatio, 2)
    );

    // Resize camera
    ifcViewerAPIRef.current.context.ifcCamera.activeCamera.aspect =
      sizes.width / sizes.height;
    ifcViewerAPIRef.current.context.ifcCamera.activeCamera.updateProjectionMatrix();
  };

  const update = () => {
    // console.log("Updated");
  };

  return (
    <div>
      <ModelViewerTools ifcViewerAPI={ifcViewerAPIRef} />
      {/* <IfcLoadExample ifcViewerAPI= {ifcViewerAPIRef} /> */}
      <div
        id="wegbgl-div"
        className="webgl"
        style={{
          position: "relative",
          height: "80vh",
          width: "100vw",
        }}
      />
    </div>
  );
}
