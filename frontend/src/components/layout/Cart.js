import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.order.cart);

  return (
    <Nav.Link as={Link} to={`/cart`} className="d-flex align-items-center mb-1">
      <i className="fas fa-shopping-cart fa-2x text-white pr-1"></i>
      <span className="text-white">
        {cart.reduce((acc, item) => item.qty + acc, 0)}
      </span>
    </Nav.Link>
  );
};
export default Cart;
