import { combineReducers } from "redux";
import CoordinatesReducer from "./coordinatesReducer";
import RegisterReducer from "./registerReducer";
import MemberReducer from "./memberReducer";
import ChatReducer from "./chatReducer";
import ContactReducer from "./contactReducer";
import RequestReducer from "./requestReducer";
import SocketReducer from "./socketReducer";

const rootReducer = combineReducers({
  coordinates: CoordinatesReducer,
  registration: RegisterReducer,
  member: MemberReducer,
  chat: ChatReducer,
  selectedContact: ContactReducer,
  requests: RequestReducer,
  socket: SocketReducer,
});

export default rootReducer;
