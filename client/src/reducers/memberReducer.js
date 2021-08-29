import { FETCH_MEMBER } from "../actions/memberActions";
import { LOGOUT_MEMBER } from "../actions/memberActions";

const DEFAULT_STATE = {
  member: [],
  loaded: false,
};

const memberReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_MEMBER:
      return {
        ...state,
        member: action.payload,
        loaded: true,
      };
    case LOGOUT_MEMBER:
      return {
        member: [],
        loaded: false,
      };
    default:
      return state;
  }
};

export default memberReducer;
