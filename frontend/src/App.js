import "./App.css";
import { Route, Switch } from "react-router-dom";
import PublicNavbar from "./components/layout/PublicNavbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const App = () => {
  return (
    <>
      <ToastContainer
        pauseOnHover
        newestOnTop={false}
        position="top-right"
        hideProgressBar={false}
      />
      <PublicNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/auth" component={RegisterPage} />;
      </Switch>
    </>
  );
};

export default App;
