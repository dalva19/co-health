import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";
import RegisterReducer from "./registerReducer";
import MemberReducer from "./memberReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
  registration: RegisterReducer,
  member: MemberReducer,
});

export default rootReducer;
