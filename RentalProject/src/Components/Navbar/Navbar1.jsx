import React from "react";
import './Navbar.css'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Tenants from "../Pages/Tenants";

const Navbar1 = () => {
  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container className="navContainer">
          <Navbar.Brand>
            <Link to="/" className="linkhead">PVR MALL</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="links">
            <Nav className="links ">
              <Link className="linkTags" to="/Tenant">Tenant</Link>
              <Link className="linkTags" to="/Assets ">Assets</Link>
              <Link className="linkTags" to="/Users ">Users</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbar1;
