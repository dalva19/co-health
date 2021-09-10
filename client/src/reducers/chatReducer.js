import { FETCH_CHAT, SET_LOADING } from "../actions/chatActions";

const DEFAULT_STATE = {
  chats: [null],
  loading: true,
};

const chatReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT:
      return {
        ...state,
        chats: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default chatReducer;
