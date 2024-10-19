// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/citta">
            <Nav.Link>Città</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/storia">
            <Nav.Link>Storia</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Cultura" id="basic-nav-dropdown">
            <LinkContainer to="/cultura/arti">
              <NavDropdown.Item>Arti</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/cultura/festivita">
              <NavDropdown.Item>Festività</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/cultura/tradizioni">
              <NavDropdown.Item>Tradizioni</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/gastronomia">
            <Nav.Link>PiattiTipici</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/posti-da-visitare">
            <Nav.Link>Parchi Nazionali</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;