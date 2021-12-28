import React, { useState } from "react";

function Sidebar() {
  return (
    <div class="sidebar">
      <div class="tree-menu-container">
        <ul id="tree-menu"></ul>
      </div>
      <div id="property-menu" class="property-menu">
        <div class="property-root">
          <div class="property-name">Name</div>
          <div class="property-value">Value</div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
