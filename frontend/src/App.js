import "./bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PublicNavbar from "./components/layout/PublicNavbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AlertMsg from "./components/layout/AlertMsg";
import { Container } from "react-bootstrap";
const App = () => {
  return (
    <>
      <AlertMsg />
      <PublicNavbar />
      <main>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/auth" component={RegisterPage} />;
            <Route path="/login" component={LoginPage} />;
            <Route path="/product/:id" component={ProductPage} />;
            <Route path="/cart/:id?" component={CartPage} />;
          </Switch>
        </Container>
      </main>
    </>
  );
};

export default App;
