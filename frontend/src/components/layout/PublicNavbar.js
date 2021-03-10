import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Squash as Hamburger } from "hamburger-react";

const PublicNavbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Navbar expand="lg" bg="custom" variant="dark">
        <Navbar.Brand as={Link} to="/">
          CoderShop
        </Navbar.Brand>
        <SearchBar classes={"d-none d-lg-block"} />
        <Navbar.Toggle
          children={<Hamburger toggled={isOpen} toggle={setOpen} />}
          aria-controls="responsive-navbar-nav"
          bsPrefix="navbar-toggler hamburger"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto ">
            <Nav.Link className="navbar-nav-link" as={Link}>
              Log In
            </Nav.Link>
            <Nav.Link
              className="navbar-nav-link link-register"
              as={Link}
              to={"/auth"}
            >
              Sign Up
            </Nav.Link>
            <SearchBar classes={"d-lg-none"} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default PublicNavbar;
