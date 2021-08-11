import {
  SET_REGISTER_STATUS,
  FETCH_MEMBER,
} from "../actions/memberProfileActions";

const DEFAULT_STATE = {
  registered: false,
  member: [],
  loaded: false,
};

const memberProfileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_REGISTER_STATUS:
      return {
        registered: true,
      };
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

export default memberProfileReducer;
