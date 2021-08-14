import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
//style
import GlobalStyle from "./styles/GlobalStyle";
//pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import RegistrationPage from "./pages/RegistrationPage";
//components
import Nav from "./components/Nav";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Redirect to="/co-health" />
        </Route>
        <Route exact path="/co-health" component={HomePage} />
        <Route exact path="/co-health/login" component={LoginPage} />
        <Route exact path="/co-health/register" component={RegistrationPage} />
        <Route exact path="/co-health/profile" component={MemberPage} />
      </Switch>
    </>
  );
};

export default App;
