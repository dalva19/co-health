import { FETCH_CHAT } from "../actions/chatActions";

const DEFAULT_STATE = {
  chats: [],
  chatRoom: null,
  loaded: false,
};

const chatReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT:
      return {
        ...state,
        chats: action.payload,
        chatRoom: "chat",
        loaded: true,
      };
    default:
      return state;
  }
};

export default chatReducer;
