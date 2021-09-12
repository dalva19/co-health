import { FETCH_CHAT, RESET_CHAT } from "../actions/chatActions";

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
    case RESET_CHAT:
      return {
        ...state,
        chats: [null],
      };
    default:
      return state;
  }
};

export default chatReducer;
