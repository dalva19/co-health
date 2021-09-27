import { FETCH_COMMUNITY_REQUESTS } from "../actions/communityRequestsActions";
import { RESET_COMMUNITY_REQUESTS } from "../actions/communityRequestsActions";

const DEFAULT_STATE = {
  requests: [],
  isLoading: true,
};

const communityRequestsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMUNITY_REQUESTS:
      return {
        ...state,
        requests: action.payload,
        isLoading: false,
      };
    case RESET_COMMUNITY_REQUESTS:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default communityRequestsReducer;
