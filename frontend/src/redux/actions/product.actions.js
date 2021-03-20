import api from "../api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";

const productActions = {};

productActions.getAllProducts = (keywords = "", page = 1) => async (
  dispatch
) => {
  try {
    dispatch({ type: types.GET_PRODUCTS_REQUEST });
    const { data } = await api.get(`/product?search=${keywords}&page=${page}`);
    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.GET_PRODUCTS_FAIL, payload: error.errors.message });
  }
};

productActions.getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST });
    const { data } = await api.get(`/product/${id}`);
    dispatch({
      type: types.GET_SINGLE_PRODUCT_SUCCESS,
      payload: data.data.product,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.GET_SINGLE_PRODUCT_FAIL,
      payload: error.errors.message,
    });
  }
};

productActions.createProduct = (product) => async (dispatch) => {
  //temporary fix
  // const image = { imageUrl: product.image1 };
  // product.images = [...product.images, image];
  console.log("ACTION", product);
  product.images.shift();
  try {
    dispatch({ type: types.CREATE_PRODUCT_REQUEST });
    const { data } = await api.post("/product/add", product);
    dispatch({ type: types.CREATE_PRODUCT_SUCCESS });
    toast.success("Product created!");
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.CREATE_PRODUCT_FAIL,
      payload: error.errors.message,
    });
  }
};

productActions.deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST });
    const { data } = await api.delete(`/product/${productId}/delete`);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: productId });
    toast.success("Product deleted!");
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.DELETE_PRODUCT_FAIL,
      payload: error.errors.message,
    });
  }
};

productActions.restoreProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: types.RESTORE_PRODUCT_REQUEST });
    const { data } = await api.put(`/product/${productId}/restore`);
    dispatch({ type: types.RESTORE_PRODUCT_SUCCESS, payload: productId });
    toast.success("Product restored!");
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.RESTORE_PRODUCT_FAIL,
      payload: error.errors.message,
    });
  }
};

productActions.editProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_PRODUCT_REQUEST });
    const { data } = await api.put(`/product/${product._id}/update`, product);
    dispatch({ type: types.EDIT_PRODUCT_SUCCESS, payload: data.data });
    toast.success("Product edited!");
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.EDIT_PRODUCT_FAIL,
      payload: error.errors.message,
    });
  }
};

productActions.getDeletedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DELETED_PRODUCTS_REQUEST });
    const { data } = await api.get(`/product/admin/deleted`);
    dispatch({
      type: types.GET_DELETED_PRODUCTS_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.GET_DELETED_PRODUCTS_FAIL,
      payload: error.errors.message,
    });
  }
};
export default productActions;
