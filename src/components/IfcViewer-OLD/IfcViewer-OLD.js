import { MeshLambertMaterial, MeshPhongMaterial } from "three";
import { Color } from "three";
import { IfcProject } from "web-ifc";
import { IfcViewerAPI } from "web-ifc-viewer";

function createCanvas() {
  // test
  console.log("Hello, CanvasViewer.js is working");

  // DOM
  const container = document.getElementById("canvasViewer");

  const GUI = {
    input: document.getElementById("file-input"),
    loader: document.getElementById("loader-button"),
    props: document.getElementById("property-menu"),
    tree: document.getElementById("tree-menu"),
  };

  // sustitute hidden input with button
  GUI.loader.onclick = () => GUI.input.click();

  // declare ifcTree
  let ifcTree;

  // set viewer
  const viewer = new IfcViewerAPI({
    container: container,
    backgroundColor: new Color(255, 255, 255),
  });

  // viewer elements
  viewer.IFC.setWasmPath("../../files/");
  viewer.addAxes();
  viewer.addGrid();

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
    createTreeMenu(model.modelID);
  }

  loadExampleModel();

  // THREE
  // materials
  // const preselectMaterial = new MeshBasicMaterial({
  //   color: 0xff0000,
  //   depthTest: false,
  //   opacity: 0.2,
  //   transparent: true,
  // });

  // IFC TOOLS
  // actions handlers
  // preselection
  container.onmousemove = () => viewer.IFC.prePickIfcItem();

  //others
  container.ondblclick = async () => {
    const curObject = await viewer.IFC.pickIfcItem(true);
    if(curObject === null || curObject === undefined) return;
    const curObjectProps = await viewer.IFC.getProperties(curObject.modelID, curObject.id, true, true);
    console.log(curObjectProps);
    updatePropertyMenu(curObjectProps);
}


function updatePropertyMenu (objectPropsToUpdate) {
    
    removeAllChildren(GUI.props)

    const mats = objectPropsToUpdate.mats;
    const psets = objectPropsToUpdate.psets;
    const type = objectPropsToUpdate.type;

    // delete objectPropsToUpdate.mats;
    // delete objectPropsToUpdate.psets;
    // delete objectPropsToUpdate.type;

    for(let curPropName in objectPropsToUpdate) {
        const curPropValue = objectPropsToUpdate[curPropName];
        const curPropType = curPropName;
        createPropertyEntry(curPropName, curPropValue);
    }
}

function createPropertyEntry(curPropName, curPropValue) {
    // container
    const root = document.createElement("div");
    root.classList.add("property-root");

    if(curPropValue === null || curPropValue === undefined) curPropValue = "null/undefined value";
    else if(curPropValue.value) curPropValue = curPropValue.value;

    // name
    const curKeyDiv = document.createElement("div");
    curKeyDiv.classList.add("property-name");
    curKeyDiv.textContent = curPropName;
    root.appendChild(curKeyDiv);

    const curValueDiv = document.createElement("div");
    curValueDiv.classList.add("property-value");
    curValueDiv.textContent = curPropValue;
    root.appendChild(curValueDiv);

    GUI.props.appendChild(root);

}

function removeAllChildren(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

// Tree menu

var toggler = document.getElementsByClassName("caret");
var i;

for (let i = 0; i < toggler.length; i++) {
    const current = toggler[i]

    current.onclick = () => {
        current.parentElement.querySelector(".nested").classList.toggle("active");
        current.classList.toggle("caret-down");
    };
}

async function createTreeMenu(modelID) {
    ifcProject = await viewer.IFC.getSpatialStructure(modelID);
    removeAllChildren(GUI.tree);

    const ifcProjectNode = createNestedChild(GUI.tree, ifcProject);
    ifcProject.children.forEach(child => {
        constructTreeMenuNode(ifcProjectNode, child);
    })
}

function constructTreeMenuNode(parent, node) {
    const children = node.children;
    if (children.length === 0) {
        createSimpleChild(parent, node);
        return;
    }
    const nodeElement = createNestedChild(parent, node);
    children.forEach(child => {
        constructTreeMenuNode(nodeElement, child);
    });
}

function createNestedChild(parent, node) {
    const content = nodeToString(node);
    const root = document.createElement("li");
    createNestedNodeTitle(root, content);
    const childrenContainer = document.createElement("ul");
    childrenContainer.classList.add("nested");
    root.appendChild(childrenContainer);
    parent.appendChild(root);
    return childrenContainer;
}

function createNestedNodeTitle(parent, content) {
    const title = document.createElement("span");
    title.classList.add("caret");
    title.onclick = () => {
        title.parentElement.querySelector(".nested").classList.toggle("active");
        title.classList.toggle("caret-down");
    };
    title.textContent = content;
    parent.appendChild(title);
}

function createSimpleChild(parent, node) {
    const childNode = document.createElement("li");
    childNode.classList.add("leaf-node");
    childNode.textContent = nodeToString(node);
    parent.appendChild(childNode);

    childNode.onmouseenter = () => {
        viewer.IFC.prepickIfcItemsByID(0, [node.expressID]);
    }

    childNode.onclick = async () => {
        viewer.IFC.pickIfcItemsByID(0, [node.expressID], true);
        const props = await viewer.IFC.getProperties(0, node.expressID, true );
        updatePropertyMenu(props);
    }
}

function nodeToString(node) {
    return `${node.type} - ${node.expressID}`;
}


}

export default createCanvas;
