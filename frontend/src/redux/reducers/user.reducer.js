import * as types from "../constants/user.constants";

const initialState = { user: {}, loading: false, error: null };
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_USER_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_USER_SUCCESS:
    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, user: payload, loading: false };
    case types.CREATE_USER_FAIL:
    case types.GET_CURRENT_USER_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default userReducer;
