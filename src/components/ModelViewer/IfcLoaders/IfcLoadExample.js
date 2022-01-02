import React, { useEffect, useRef, useState } from "react";

export default function IfcLoadExample(props) {
  const addExample = () => {
    const curIfcViewerAPI = props.ifcViewerAPI
    curIfcViewerAPI.current.IFC.loadIfcUrl("models/IfcExample.ifc", true);
  };

  return <div onClick={addExample}>Add example</div>;
}
