import React, { useEffect, useRef, useState } from "react";

export default function IfcLoadExample(props) {
  const addExample = () => {
    const curIfcViewerAPI = props.ifcViewerAPI
    curIfcViewerAPI.current.IFC.loadIfcUrl("models/IfcExample.ifc", true);
  };

  return <p onClick={addExample}>Add example</p>;
}
