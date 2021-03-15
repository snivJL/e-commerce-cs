import * as types from "../constants/user.constants";

const initialState = {
  user: {},
  users: [],
  myOrders: [],
  loading: false,
  error: null,
};
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_USER_REQUEST:
    case types.GET_USERS_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
    case types.GET_USER_ORDER_REQUEST:
    case types.MAKE_PAYMENT_REQUEST:
    case types.TOPUP_USER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_USER_SUCCESS:
    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, user: payload, loading: false };
    case types.SELECT_USER:
      return { ...state, selectedUser: payload };
    case types.GET_USERS_SUCCESS:
      return { ...state, users: payload, loading: false };
    case types.GET_USER_ORDER_SUCCESS:
      return { ...state, myOrders: payload, loading: false };
    case types.TOPUP_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((u) => (u._id === payload._id ? payload : u)),
        loading: false,
      };
    case types.MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        myOrders: state.myOrders.map((o) =>
          o._id === payload._id ? payload : o
        ),
        loading: false,
      };

    case types.CREATE_USER_FAIL:
    case types.GET_CURRENT_USER_FAIL:
    case types.GET_USER_ORDER_FAIL:
    case types.GET_USERS_FAIL:
    case types.MAKE_PAYMENT_FAIL:
    case types.TOPUP_USER_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default userReducer;
