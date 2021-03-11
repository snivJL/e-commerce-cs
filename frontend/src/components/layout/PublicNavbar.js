import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../../redux/actions/auth.actions";
import userActions from "../../redux/actions/user.actions";

const AdminLinks = () => {
  return (
    <>
      <NavDropdown
        className="navbar-nav-dropdown"
        title="Admin"
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item href="#action/3.1">Create Product</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Edit Product</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Top Up</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">List Products</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

const PublicLinks = () => {
  return (
    <>
      <Nav.Link className="navbar-nav-link" as={Link} to="/login">
        Log In
      </Nav.Link>
      <Nav.Link
        className="navbar-nav-link link-register"
        as={Link}
        to={"/auth"}
      >
        Sign Up
      </Nav.Link>
    </>
  );
};

const AuthLinks = () => {
  const { loading, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  return (
    <>
      {!loading && user.role === "admin" && <AdminLinks />}

      <Nav.Link
        className="navbar-nav-link"
        onClick={() => dispatch(authActions.logout())}
      >
        Log Out
      </Nav.Link>
    </>
  );
};

const PublicNavbar = () => {
  const [isOpen, setOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) dispatch(userActions.getCurrentUser());
  }, [dispatch, isAuthenticated]);

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
          <Nav className="ml-auto">
            <Cart />

            {isAuthenticated ? <AuthLinks /> : <PublicLinks />}
            <SearchBar classes={"d-lg-none"} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default PublicNavbar;
