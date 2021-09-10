import { SET_SOCKET } from "../actions/socketActions";

const DEFAULT_STATE = {
  socket: null,
};

const socketReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
