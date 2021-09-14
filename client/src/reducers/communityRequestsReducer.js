import { FETCH_COMMUNITY_REQUESTS } from "../actions/communityRequestsActions";

const DEFAULT_STATE = {
  requests: [],
};

const communityRequestsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMUNITY_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};

export default communityRequestsReducer;
