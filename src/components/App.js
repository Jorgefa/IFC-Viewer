import React, { useState } from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div>
      <input type="file" id="file-input"></input>
      <Header />
      <div class="app-container">
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
}
export default App;
