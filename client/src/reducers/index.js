import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";
import RegisterReducer from "./registerReducer";
import MemberReducer from "./memberReducer";
import ChatReducer from "./chatReducer";
import ContactReducer from "./contactReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
  registration: RegisterReducer,
  member: MemberReducer,
  chat: ChatReducer,
  selectedContact: ContactReducer,
});

export default rootReducer;
