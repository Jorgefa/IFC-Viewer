import React, { useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import ModelViewer from "../ModelViewer/ModelViewer";
import ModelViewerCanvas from "../ModelViewer/ModelViewerCanvas";

export default function IfcLoadExample() {
  const curViewer = window.modelViewer.viewer;
  curViewer.current.IFC.loadIfcUrl("models/IfcExample.ifc", true);
}
