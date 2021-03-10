import "./App.css";
import { Route, Switch } from "react-router-dom";
import PublicNavbar from "./components/layout/PublicNavbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AlertMsg from "./components/layout/AlertMsg";
const App = () => {
  return (
    <>
      <AlertMsg />
      <PublicNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/auth" component={RegisterPage} />;
        <Route path="/login" component={LoginPage} />;
      </Switch>
    </>
  );
};

export default App;
