import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
const Cart = () => {
  const order = useSelector((state) => state.order);
  return (
    <Nav.Link>
      <i className="fas fa-shopping-cart text-white ">
        {order.cart.length > 0 && (
          <span className="cart-qty">{order.cart.length}</span>
        )}
      </i>
    </Nav.Link>
  );
};
export default Cart;
