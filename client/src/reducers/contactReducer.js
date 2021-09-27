import { FETCH_CONTACT } from "../actions/contactActions";
import { RESET_CONTACT } from "../actions/contactActions";

const DEFAULT_STATE = {
  contact: [],
  isLoading: true,
};

const contactReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACT:
      return {
        ...state,
        contact: [action.payload],
        isLoading: false,
      };
    case RESET_CONTACT:
      return {
        contact: [],
        isLoading: true,
      };
    default:
      return DEFAULT_STATE;
  }
};

export default contactReducer;
