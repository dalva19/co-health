import { FETCH_PROFILE } from "../actions/profilesActions";
import { RESET_PROFILE } from "../actions/profilesActions";

const DEFAULT_STATE = {
  profile: [],
  isLoading: true,
};

const memberReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        profile: [action.payload],
        isLoading: false,
      };
    case RESET_PROFILE:
      return {
        profile: [],
        isLoading: true,
      };
    default:
      return DEFAULT_STATE;
  }
};

export default memberReducer;
