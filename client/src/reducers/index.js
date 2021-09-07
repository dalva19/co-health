import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";
import RegisterReducer from "./registerReducer";
import MemberReducer from "./memberReducer";
import ChatReducer from "./chatReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
  registration: RegisterReducer,
  member: MemberReducer,
  chat: ChatReducer,
});

export default rootReducer;
