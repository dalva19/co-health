import { FETCH_CONTACT } from "../actions/contactAction";

const DEFAULT_STATE = {
  contact: [],
  loaded: false,
};

const chatReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACT:
      return {
        ...state,
        contact: action.payload,
        loaded: true,
      };
    default:
      return state;
  }
};

export default chatReducer;
