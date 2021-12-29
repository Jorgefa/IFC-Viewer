import React from "react";
import ModelViewer from "./ModelViewer"

function Test() {
    const modelViewer = new ModelViewer()
    
    // return <h1>hola</h1>

    return modelViewer.render()
  }

export default Test