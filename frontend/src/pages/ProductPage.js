import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../redux/actions/product.actions";
import Loader from "../components/layout/Loader";
import orderActions from "../redux/actions/order.actions";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const productId = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const fakeStock = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    dispatch(productActions.getSingleProduct(productId.id));
  }, [dispatch, productId]);

  const addToCart = () => {
    dispatch(orderActions.addToCart(qty, product));
    // history.push(`/cart/${productId.id}?${qty}`);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Link className="btn btn-light my-3 " to="/">
            <i class="far fa-arrow-alt-circle-left"></i> Back
          </Link>
          <Row>
            <Col md={6}>
              <Image fluid src={product.images[0].imageUrl}></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>In stock</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value))}
                        >
                          {fakeStock.map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={addToCart}
                      className="btn-block"
                      style={{ backgroundColor: "#fd5c32", border: "none" }}
                      type="button"
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
