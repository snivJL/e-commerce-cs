import * as types from "../constants/order.constants";
import { toast } from "react-toastify";
import api from "../api";
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
  localStorage.setItem("paymentMethod", JSON.stringify(data.paymentMethod));
};

orderActions.createOrder = (order, cartPrice) => async (dispatch) => {
  try {
    const formatOrder = {};
    formatOrder.products = order.cart.map((p) => p.product._id);
    formatOrder.shipping = order.shippingAddress;
    formatOrder.status = "paid";
    formatOrder.total = cartPrice;
    console.log(order, "format", formatOrder);
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    api.post("/order/add", formatOrder);
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.errors.message });
  }
};
export default orderActions;
