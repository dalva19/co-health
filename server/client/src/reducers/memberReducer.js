import { FETCH_MEMBER } from "../actions/memberActions";

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
    default:
      return state;
  }
};

export default memberReducer;
