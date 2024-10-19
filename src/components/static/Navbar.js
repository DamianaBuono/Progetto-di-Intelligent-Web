// src/components/Navbar.js
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../style/Navbar.css'; // Assicurati che il percorso sia corretto

function MyNavbar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} onToggle={handleToggle} className="navbar">
      <Navbar.Brand href="/">Alla scoperta del Giappone</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/" onClick={handleNavItemClick}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/citta" onClick={handleNavItemClick}>
            <Nav.Link>Città</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/storia" onClick={handleNavItemClick}>
            <Nav.Link>Storia</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Cultura" id="basic-nav-dropdown" className="nav-dropdown">
            <LinkContainer to="/cultura/arti" onClick={handleNavItemClick}>
              <NavDropdown.Item>Arti</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/cultura/festivita" onClick={handleNavItemClick}>
              <NavDropdown.Item>Festività</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/cultura/tradizioni" onClick={handleNavItemClick}>
              <NavDropdown.Item>Tradizioni</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/gastronomia" onClick={handleNavItemClick}>
            <Nav.Link>Piatti Tipici</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/posti-da-visitare" onClick={handleNavItemClick}>
            <Nav.Link>Parchi Nazionali</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
