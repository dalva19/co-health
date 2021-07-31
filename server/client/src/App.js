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
//components
import Nav from "./components/Nav";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/co-health" />
          </Route>
          <Route exact path="/co-health" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/member-profile" component={MemberPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
