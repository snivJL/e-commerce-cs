import * as types from "../constants/product.constants";

const initialState = { loading: false, products: [] };
const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: payload };
    case types.GET_PRODUCTS_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default productReducer;
