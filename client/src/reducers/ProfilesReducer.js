import { FETCH_PROFILE, RESET_PROFILE } from "../actions/profilesActions";

const DEFAULT_STATE = {
  profile: [],
  isLoading: true,
};

const profileReducer = (state = DEFAULT_STATE, action) => {
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

export default profileReducer;
