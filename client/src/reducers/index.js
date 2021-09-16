import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";
import RegisterReducer from "./registerReducer";
import MemberReducer from "./memberReducer";
import ChatReducer from "./chatReducer";
import ContactReducer from "./contactReducer";
import RequestReducer from "./requestReducer";
import OfferReducer from "./offerReducer";
import CommunityRequestsReducer from "./communityRequestsReducer";
import LicenseReducer from "./licenseReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
  registration: RegisterReducer,
  member: MemberReducer,
  chat: ChatReducer,
  selectedContact: ContactReducer,
  requests: RequestReducer,
  offers: OfferReducer,
  communityRequests: CommunityRequestsReducer,
  license: LicenseReducer,
});

export default rootReducer;
