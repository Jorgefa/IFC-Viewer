import { MeshBasicMaterial } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

function CanvasViewer() {
  console.log("Hello, CanvasViewer.js is working");

  const preselectMaterial = new MeshBasicMaterial({
    color: 0xff0000,
    depthTest: false,
    opacity: 0.2,
    transparent: true,
  });

  const container = document.getElementById("canvas");
  const viewer = new IfcViewerAPI({
    container: container,
    preselectMaterial: preselectMaterial,
  });
  viewer.addAxes();
  viewer.addGrid();
  viewer.IFC.setWasmPath("files/");

  const input = document.getElementById("file-input");

  input.addEventListener(
    "change",

    async (changed) => {
      const file = changed.target.files[0];
      const ifcURL = URL.createObjectURL(file);
      viewer.IFC.loadIfcUrl(ifcURL);
    },

    false
  );

  window.onmousemove = () => {
    viewer.IFC.prePickIfcItem();
  };

  viewer.context.renderer.usePostproduction = true;

  viewer.clipper.active = true;
  window.ondblclick = async () => {
    viewer.clipper.createPlane();
    // const propsData = await viewer.IFC.pickIfcItem();
    // console.log(propsData)
    // const props = await viewer.IFC.getProperties(propsData.modelID,propsData.id, true, false)
    // console.log(props)
  };
}

export default CanvasViewer;
