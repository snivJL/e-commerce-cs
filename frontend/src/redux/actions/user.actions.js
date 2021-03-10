import api from "../api";
import * as types from "../constants/user.constants";
import { toast } from "react-toastify";

const userActions = {};

userActions.register = (user) => async (dispatch) => {
  const { name, email, password } = user;
  try {
    dispatch({ type: types.CREATE_USER_REQUEST });
    const { data } = await api.post("/user", { name, email, password });
    dispatch({ type: types.CREATE_USER_SUCCESS, payload: data.data.user });
  } catch (error) {
    console.error(error);
    toast.error(error.errors.message);
    dispatch({ type: types.CREATE_USER_FAIL, payload: error.errors.message });
  }
};

userActions.getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CURRENT_USER_REQUEST });
    const { data } = await api.get("/user/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: data.data.user });
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.GET_CURRENT_USER_FAIL,
      payload: error.errors.message,
    });
  }
};

export default userActions;
