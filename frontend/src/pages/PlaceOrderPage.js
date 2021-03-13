import React from "react";
import {
  Image,
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "../redux/actions/order.actions";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderPage = () => {
  const history = useHistory();

  const paymentMethod = useSelector((state) => state.order.paymentMethod);
  if (!paymentMethod) history.push("/payment");
  const order = useSelector((state) => state.order);
  const cartPrice = order.cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const dispatch = useDispatch();

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="justify-content-center ">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},{order.shippingAddress.city}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup>
                {order.cart.map((p) => (
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image
                          src={p.product.images[0].imageUrl}
                          alt={p.product.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${p.product._id}`}>
                          {p.product.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {p.qty} x ${p.product.price} = $
                        {p.qty * p.product.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2> Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cartPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>$15</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$15</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cartPrice + 30}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block bg-primary"
                  disabled={order.cart.length === 0}
                  onClick={() =>
                    dispatch(orderActions.createOrder(order, cartPrice))
                  }
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderPage;
