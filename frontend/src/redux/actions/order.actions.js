import * as types from "../constants/order.constants";
import { toast } from "react-toastify";
const orderActions = {};

orderActions.addToCart = (qty = 1, product) => (dispatch, getState) => {
  dispatch({ type: types.ADD_TO_CART, payload: { product, qty } });
  localStorage.setItem("cartItems", JSON.stringify(getState().order.cart));
  toast.success("Added to cart!");
};

orderActions.removeFromCart = (qty = 1, product) => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_FROM_CART, payload: { product, qty } });
  localStorage.setItem("cartItems", JSON.stringify(getState().order.cart));
};

orderActions.saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: types.SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

orderActions.savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: types.SAVE_PAYMENT_METHOD, payload: data.paymentMethod });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
export default orderActions;
