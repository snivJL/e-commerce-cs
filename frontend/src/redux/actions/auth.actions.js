import api from "../api";
import * as types from "../constants/auth.constants";
import { toast } from "react-toastify";
const authActions = {};

authActions.login = (values) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_USER_REQUEST });
    const { data } = await api.post("/auth", values);

    api.defaults.headers.common["authorization"] = "Bearer " + data.data.token;

    localStorage.setItem("token", data.data.token);

    dispatch({ type: types.LOGIN_USER_SUCCESS, payload: data.data });
    toast.success(`Welcome ${data.data.user.name}`);
  } catch (error) {
    console.error(error);
    dispatch({ type: types.LOGIN_USER_FAIL, payload: error.errors.message });
    toast.error(error.errors.message);
  }
};

authActions.logout = () => async (dispatch) => {
  console.log("LOGOUT");
  dispatch({ type: types.LOGOUT_USER });
  toast.success("See you soon!");
  localStorage.removeItem("token");
};
console.log(authActions);
export default authActions;
