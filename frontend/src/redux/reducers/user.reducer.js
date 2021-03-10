import * as types from "../constants/user.constants";

const initialState = { user: {}, loading: false, error: null };
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_USER_SUCCESS:
      return { ...state, user: payload };
    case types.CREATE_USER_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default userReducer;
