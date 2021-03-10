import * as types from "../constants/auth.constants";

const initialState = {
  user: {},
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  token: localStorage.getItem("token"),
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_USER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
      };
    case types.LOGIN_USER_FAIL:
      return { ...state, loading: false };
    case types.LOGOUT_USER:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
