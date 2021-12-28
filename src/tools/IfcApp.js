import { MeshLambertMaterial, MeshPhongMaterial } from "three";
import { Color } from "three";
import { IfcProject } from "web-ifc";
import { IfcViewerAPI } from "web-ifc-viewer";

function createCanvas() {
  // test
  console.log("Hello, CanvasViewer.js is working");

  // DOM
  const container = document.getElementById("canvas");

  const GUI = {
    input: document.getElementById("file-input"),
    // loader: document.getElementById("loader-button"),
    // props: document.getElementById("property-menu"),
    // tree: document.getElementById("tree-menu"),
  };

  // set viewer
  const viewer = new IfcViewerAPI({
    container: container,
    backgroundColor: new Color(255, 255, 255),
  });

  // viewer elements
  viewer.IFC.setWasmPath("../../files/");
  viewer.addAxes();
  viewer.addGrid();

  // GUI.loader.onclick = () => GUI.input.click(); // check this to sustitute the input button

  // loading models
  // input
  GUI.input.onchange = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const model = await viewer.IFC.loadIfcUrl(url);
    ifcTree = viewer.IFC.getSpatialStructure(model.modelID);
    console.log(ifcTree);
  };

  // example model
  async function loadExampleModel() {
    const model = await viewer.IFC.loadIfcUrl("models/test.ifc");
    // createTreeMenu(model.modelID);
  }

  loadExampleModel();

  // THREE
  // materials
  const preselectMaterial = new MeshBasicMaterial({
    color: 0xff0000,
    depthTest: false,
    opacity: 0.2,
    transparent: true,
  });

  // IFC TOOLS
  // actions handlers

  container.onmousemove = () => {
    viewer.IFC.prePickIfcItem();
  };
}

export default createCanvas;
