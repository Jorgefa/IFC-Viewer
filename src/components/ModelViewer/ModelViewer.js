import React, { useEffect, useRef, useState } from "react";

import { IfcViewerAPI } from "web-ifc-viewer";
import Camera from "./Camera";
import IfcLoadExample from "./IfcLoaders/IfcLoadExample";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default function ModelViewer() {
  //   const ifcModels = useSelector((state) => state.ifcModels.value);

  const ifcViewerAPIRef = useRef();
  const cameraRef = useRef();
  const canvasRef = useRef();

  //Creates the Three.js scene
  useEffect(() => {
    canvasRef.current = document.querySelector("div.webgl");
    ifcViewerAPIRef.current = new IfcViewerAPI({
      container: canvasRef.current,
    });

    ifcViewerAPIRef.current.addAxes();
    ifcViewerAPIRef.current.addGrid();
    ifcViewerAPIRef.current.IFC.setWasmPath("../../files/");

    // Onmouse preselector
    canvasRef.current.onmousemove = () => ifcViewerAPIRef.current.IFC.prePickIfcItem();

    // DblClick selector
    canvasRef.current.ondblclick = async () => {
      const curObject = await ifcViewerAPIRef.current.IFC.pickIfcItem(true);
      if(curObject === null || curObject === undefined) return;
      const curObjectProps = await ifcViewerAPIRef.current.IFC.getProperties(curObject.modelID, curObject.id, true, true);
      console.log(curObjectProps);
  }
    console.log(canvasRef);
    console.log(ifcViewerAPIRef);
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

    console.log(sizes);
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
      <IfcLoadExample ifcViewerAPI={ifcViewerAPIRef} />
      <div
        id="wegbgl-div"
        className="webgl"
        style={{
          position: "relative",
          height: "80vh",
          width: "80vw",
        }}
      />
    </div>
  );
}
