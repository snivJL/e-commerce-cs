import * as types from "../constants/user.constants";

const initialState = { user: {}, users: [], loading: false, error: null };
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_USER_REQUEST:
    case types.GET_USERS_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
    case types.TOPUP_USER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_USER_SUCCESS:
    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, user: payload, loading: false };
    case types.SELECT_USER:
      return { ...state, selectedUser: payload };
    case types.GET_USERS_SUCCESS:
      return { ...state, users: payload, loading: false };
    case types.TOPUP_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((u) => (u._id === payload._id ? payload : u)),
        loading: false,
      };
    case types.CREATE_USER_FAIL:
    case types.GET_CURRENT_USER_FAIL:
    case types.GET_USERS_FAIL:
    case types.TOPUP_USER_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default userReducer;
