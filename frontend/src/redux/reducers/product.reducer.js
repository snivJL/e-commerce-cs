import * as types from "../constants/product.constants";

const initialState = {
  loading: true,
  products: [],
  selectedProduct: { images: [{}] },
};
const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
    case types.GET_SINGLE_PRODUCT_REQUEST:
    case types.EDIT_PRODUCT_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case types.GET_PRODUCTS_SUCCESS:
      return { ...state, products: payload, loading: false };
    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, selectedProduct: payload, loading: false };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((p) => p._id !== payload),
        loading: false,
      };
    case types.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map((p) => {
          if (p._id === payload._id) return payload;
          else return p;
        }),
        loading: false,
      };

    case types.GET_PRODUCTS_FAIL:
    case types.GET_SINGLE_PRODUCT_FAIL:
    case types.DELETE_PRODUCT_FAIL:
    case types.EDIT_PRODUCT_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default productReducer;
