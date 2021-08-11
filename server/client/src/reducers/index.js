import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";
import MemberProfileReducer from "./registerReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
  registration: MemberProfileReducer,
});

export default rootReducer;
