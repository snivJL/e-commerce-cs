import * as types from "../constants/order.constants";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartItems")) || [],
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
    default:
      return state;
  }
};

export default orderReducer;
