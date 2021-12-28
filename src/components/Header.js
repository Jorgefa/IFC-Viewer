import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

function Header() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link>
          <div class="button">Home</div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <div id="loader-button" class="button">
            Open
          </div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          <div id="unloader-button" class="button">
            Unload
          </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
