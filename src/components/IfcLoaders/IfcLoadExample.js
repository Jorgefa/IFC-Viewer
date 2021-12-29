import React, { useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";

import IfcViewer, { viewerRef, viewerAPI } from "../IfcViewer/IfcViewer";

export default function IfcLoadExample() {
  
  console.log("EIiiiiii");

  const viewerRef = IfcViewer.viewerRef;
  useEffect(() => {
    const viewerAPI = IfcViewer.viewerAPI;
    viewerRef.current = viewerAPI;
    viewerRef.current.IFC.loadIfcUrl("models/IfcExample.ifc", true);
  }, []);
}
