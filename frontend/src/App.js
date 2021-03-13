import "./bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PublicNavbar from "./components/layout/PublicNavbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import ProductListPage from "./pages/admin/ProductListPage";
import UserListPage from "./pages/admin/UserListPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import PaymentPage from "./pages/PaymentPage";
import AlertMsg from "./components/layout/AlertMsg";
import { Container } from "react-bootstrap";
const App = () => {
  return (
    <>
      <AlertMsg />
      <PublicNavbar />
      <main>
        <Container bsPrefix="container containerCustom">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/auth" component={RegisterPage} />;
            <Route path="/login" component={LoginPage} />;
            <Route path="/shipping" component={ShippingPage} />;
            <Route path="/payment" component={PaymentPage} />;
            <Route path="/admin/product/create" component={CreateProductPage} />
            <Route path="/admin/product/list" component={ProductListPage} />
            <Route path="/admin/user/list" component={UserListPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />;
            <Route path="/product/:id" component={ProductPage} />;
            <Route path="/cart/:id?" component={CartPage} />;
          </Switch>
        </Container>
      </main>
    </>
  );
};

export default App;
