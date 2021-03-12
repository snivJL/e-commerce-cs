import * as types from "../constants/order.constants";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartItems")) || [],
  shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) || [],
  loading: false,
};
const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART:
      const existItem = state.cart.find(
        (x) => x.product._id === payload.product._id
      );
      if (existItem)
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.product._id === payload.product._id
              ? { ...x, qty: x.qty + payload.qty }
              : x
          ),
        };
      else return { ...state, cart: [...state.cart, payload] };
    case types.REMOVE_FROM_CART: {
      const existItem = state.cart.find(
        (x) => x.product._id === payload.product._id
      );
      if (existItem)
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.product._id === payload.product._id
              ? { ...x, qty: x.qty - payload.qty }
              : x
          ),
        };
      else return state;
    }
    case types.SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload };
    default:
      return state;
  }
};

export default orderReducer;
