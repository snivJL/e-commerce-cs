import api from "../api";
import * as types from "../constants/auth.constants";

const initialState = { user: {}, loading: false };
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default authReducer;
