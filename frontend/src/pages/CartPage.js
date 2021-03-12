import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Alert,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import orderActions from "../redux/actions/order.actions";

const CartPage = () => {
  const productId = useParams();
  // const qty = useLocation().search.split("?")[1] || 1;
  const [qty, setQty] = useState(0);
  const fakeStock = [1, 2, 3, 4, 5, 6, 7, 8];
  const history = useHistory();
  const cart = useSelector((state) => state.order.cart);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const checkoutHandler = () => {
    isAuthenticated ? history.push("/shipping") : history.push("/login");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <Alert>
            Your cart is empty <Link to="/">Go Back</Link>
          </Alert>
        ) : (
          <>
            <ListGroup>
              {cart.map((p) => (
                <ListGroup.Item key={p.product._id}>
                  <Row className="align-items-center">
                    <Col md={3}>
                      <Image
                        src={p.product.images[0].imageUrl}
                        alt={p.product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product${productId}`}>{p.product.name}</Link>
                    </Col>
                    <Col md={3}>${p.product.price}</Col>
                    <Col>
                      <Button
                        size="sm"
                        variant="light"
                        onClick={() =>
                          dispatch(
                            orderActions.removeFromCart(undefined, p.product)
                          )
                        }
                        disabled={p.qty === 0}
                      >
                        -
                      </Button>
                      {p.qty}
                      <Button
                        size="sm"
                        variant="light"
                        onClick={() =>
                          dispatch(orderActions.addToCart(undefined, p.product))
                        }
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <Row>
                <Col md={6}>
                  <Card>
                    <ListGroup variant="flush">
                      <h3>
                        Subtotal (
                        {cart.reduce((acc, item) => item.qty + acc, 0)}) items
                      </h3>
                      $
                      {cart.reduce(
                        (acc, item) => acc + item.qty * item.product.price,
                        0
                      )}
                    </ListGroup>
                    <ListGroup.Item>
                      <Button
                        type="button"
                        onClick={checkoutHandler}
                        className="btn btn-block"
                        disabled={cart.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </ListGroup.Item>
                  </Card>
                </Col>
              </Row>
            </ListGroup>
          </>
        )}
      </Col>
    </Row>
  );
};
export default CartPage;
