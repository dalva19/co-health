import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";
import MemberProfileReducer from "./registerReducer";
import MemberReducer from "./memberReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
  registration: MemberProfileReducer,
  member: MemberReducer,
});

export default rootReducer;
