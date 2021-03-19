import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import orderActions from "../../redux/actions/order.actions";

const AddToCartButton = ({ qty = 1, product }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(orderActions.addToCart(qty, product));
  };
  return (
    <Button
      onClick={addToCart}
      className="btn-block"
      style={{ backgroundColor: "#fd5c32", border: "none" }}
      type="button"
    >
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
