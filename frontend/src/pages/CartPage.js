import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Alert,
  ListGroup,
  Image,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import orderActions from "../redux/actions/order.actions";

const CartPage = () => {
  const productId = useParams();
  // const qty = useLocation().search.split("?")[1] || 1;
  // const [qty, setQty] = useState(0);
  // const fakeStock = [1, 2, 3, 4, 5, 6, 7, 8];
  const history = useHistory();
  const cart = useSelector((state) => state.order.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const checkoutHandler = (e) => {
    e.preventDefault();
    isAuthenticated ? history.push("/shipping") : history.push("/login");
  };
  return (
    <Row className="pt-3">
      <Col md={8}>
        <h2>Shopping Cart</h2>
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
                    <Col md={2}>${p.product.price}</Col>
                    <Col>
                      <ButtonGroup>
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
                        <Button size="md" variant="light" disabled>
                          {p.qty}
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() =>
                            dispatch(
                              orderActions.addToCart(undefined, p.product)
                            )
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col>
                      <Button
                        onClick={() =>
                          dispatch(orderActions.deleteFromCart(p.product._id))
                        }
                        size="sm"
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Col>
      <Col md={4}>
        <Card className="py-2 px-4 mt-5">
          <ListGroup variant="flush">
            <h4>
              Subtotal ({cart.reduce((acc, item) => item.qty + acc, 0)}) items
            </h4>
            <div className="d-flex align-items-center px-3">
              <p>$</p>
              <h1>
                {cart.reduce(
                  (acc, item) => acc + item.qty * item.product.price,
                  0
                )}
              </h1>
            </div>
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              onClick={(e) => checkoutHandler(e)}
              className="btn-block btn-warning"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};
export default CartPage;
