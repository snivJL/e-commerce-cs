import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, ListGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../redux/actions/product.actions";
import Loader from "../components/layout/Loader";
import Rating from "../components/products/Rating";
import ImagesCarousel from "../components/products/ImagesCarousel";
import AddToCartButton from "../components/order/AddToCartButton";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const productId = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const images = useSelector((state) => state.product.selectedProduct.images);

  const fakeStock = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    dispatch(productActions.getSingleProduct(productId.id));
  }, [dispatch, productId]);

  return (
    <>
      {loading ? (
        <>
          {console.log("loading")}
          <Loader />
        </>
      ) : (
        <>
          <Link className="btn btn-light my-3 " to="/">
            <i class="far fa-arrow-alt-circle-left"></i> Back
          </Link>
          <Row>
            <Col md={6}>
              {/* <Image fluid src={image}></Image> */}
              <ImagesCarousel images={images} />
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
                <ListGroup.Item>
                  <Rating value={Math.random() * 5} />
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
                    <AddToCartButton qty={qty} product={product} />
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
