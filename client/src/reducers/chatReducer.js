import { FETCH_CHAT } from "../actions/chatActions";

const DEFAULT_STATE = {
  chats: [],
  loaded: false,
};

const chatReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT:
      return {
        ...state,
        chat: action.payload,
        loaded: true,
      };
    default:
      return state;
  }
};

export default chatReducer;
