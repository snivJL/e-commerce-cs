import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";
import { Row, Col, Alert, ListGroup, Image } from "react-bootstrap";
const CartPage = () => {
  const productId = useParams();
  const qty = useLocation().search.split("?")[1] || 1;
  const cart = useSelector((state) => state.order.cart);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <Alert>
            Your cart is empty <Link to="/">Go Back</Link>
          </Alert>
        ) : (
          <ListGroup>
            {cart.map((p) => (
              <ListGroup.Item key={p.product._id}>
                <Row>
                  <Col md={2}>
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
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};
export default CartPage;
