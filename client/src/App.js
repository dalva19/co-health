import {
  // BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
//components
import Nav from "./components/Nav";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Switch>
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

        <Route exact path="/">
          <Redirect to="/co-health" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
