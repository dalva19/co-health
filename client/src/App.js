import {
  // BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
//style
import GlobalStyle from "./styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import RegistrationPage from "./pages/RegistrationPage";
import SettingsPage from "./pages/SettingsPage";
import ActivityPage from "./pages/ActivityPage";
import MessagesPage from "./pages/MessagesPage";
import PublicProfile from "./components/members/PublicProfile";
import HeathCareLiceseForm from "./components/account-creation/HealthcareLiscenceForm";
import { getMemberProfile } from "./actions/memberActions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/nav/Nav";

const App = () => {
  const dispatch = useDispatch();
  const { loaded } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(getMemberProfile());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Nav />
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
        <Route exact path="/co-health/profile/activity">
          <ActivityPage />
        </Route>
        <Route exact path="/co-health/profile/messages">
          <MessagesPage />
        </Route>
        <Route
          path="/co-health/profile/:id"
          render={(routerProps) => (
            <PublicProfile selectedProfileId={routerProps.match.params.id} />
          )}
        />
        <Route exact path="/co-health/profile/verify-license">
          <HeathCareLiceseForm />
        </Route>

        <Route exact path="/">
          <Redirect to="/co-health" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
