import api from "../api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
const productActions = {};

productActions.getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCTS_REQUEST });
    const { data } = await api.get("/product");
    console.log("DATA", data);
    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.GET_PRODUCTS_FAIL, payload: error.errors.message });
  }
};

export default productActions;
