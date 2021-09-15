import { FETCH_MEMBER } from "../actions/memberActions";
import { LOGOUT_MEMBER } from "../actions/memberActions";
import { UPDATE_SETTINGS } from "../actions/memberActions";

const DEFAULT_STATE = {
  member: [null],
  loaded: false,
};

const memberReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_MEMBER:
      return {
        ...state,
        member: [action.payload],
        loaded: true,
      };
    case LOGOUT_MEMBER:
      return {
        member: [],
        loaded: false,
      };
    case UPDATE_SETTINGS:
      const updatedProfile = action.payload;
      const newProfile = state.member.map((profile) => {
        if (profile._id === updatedProfile._id) {
          return updatedProfile;
        } else {
          return profile;
        }
      });
      return {
        ...state,
        member: newProfile,
      };
    default:
      return state;
  }
};

export default memberReducer;
