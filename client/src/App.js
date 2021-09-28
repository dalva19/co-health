import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//style
import GlobalStyle from "./styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import RegistrationPage from "./pages/RegistrationPage";
import SettingsPage from "./pages/SettingsPage";
import MessagesPage from "./pages/MessagesPage";
import VerifyLicensePage from "./pages/VerifyLicensePage";
//components
import PublicProfile from "./components/members/PublicProfile";
import Nav from "./components/nav/Nav";
//actions
import { getMemberProfile } from "./actions/memberActions";
import { connectSocket } from "./actions/chatActions";
//io
import socketIOClient from "socket.io-client";
const keys = require("./config/keys");

const App = () => {
  const dispatch = useDispatch();
  const socketRef = useRef();

  const { loaded } = useSelector((state) => state.member);

  const ENDPOINT = keys.SOCKET_SERVER_URI;

  useEffect(() => {
    dispatch(getMemberProfile());
  }, [dispatch]);

  useEffect(() => {
    if (loaded) {
      connectSocket(socketRef, socketIOClient, ENDPOINT);
    }
  }, [socketRef, loaded, ENDPOINT]);

  return (
    <>
      <GlobalStyle />
      <Nav socketRef={socketRef} />
      <Switch>
        {loaded ? (
          <Route exact path="/co-health/">
            <Redirect to="/co-health/profile" />
          </Route>
        ) : (
          ""
        )}
        <Route exact path="/co-health">
          <HomePage />
        </Route>
        <Route exact path="/co-health/login">
          <LoginPage />
        </Route>
        <Route exact path="/co-health/register">
          <RegistrationPage />
        </Route>
        <Route exact path="/co-health/profile">
          <MemberPage />
        </Route>

        <Route exact path="/co-health/profile/settings">
          <SettingsPage />
        </Route>
        <Route exact path="/co-health/profile/messages">
          <MessagesPage socketRef={socketRef} />
        </Route>
        <Route
          path="/co-health/profile/:userId"
          render={(routerProps) => (
            <PublicProfile
              selectedProfileId={routerProps.match.params.userId}
            />
          )}
        />
        <Route
          exact
          path="/co-health/verify-license"
          render={() => <VerifyLicensePage />}
        />

        <Route exact path="/">
          <Redirect to="/co-health" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
