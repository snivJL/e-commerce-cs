import * as types from "../constants/order.constants";

const orderActions = {};

orderActions.addToCart = (qty = 1, product) => (dispatch, getState) => {
  console.log("lalala", product);
  dispatch({ type: types.ADD_TO_CART, payload: { product, qty } });
  localStorage.setItem("cartItems", JSON.stringify(getState().order.cart));
};
export default orderActions;
