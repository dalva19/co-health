import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
});

export default rootReducer;
