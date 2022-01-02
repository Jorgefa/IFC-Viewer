import ModelViewer from "../ModelViewer";

export default function IfcLoadExample() {

  const modelViewer = new ModelViewer();
  const curIfcViewerAPI = modelViewer.ifcViewerAPI;

  curIfcViewerAPI.IFC.loadIfcUrl("models/IfcExample.ifc", true);
}
