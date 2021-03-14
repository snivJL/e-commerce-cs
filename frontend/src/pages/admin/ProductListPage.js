import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/layout/Loader";
import { Link, useHistory } from "react-router-dom";
import { Row, ListGroup, Image, Col, Button } from "react-bootstrap";
import productActions from "../../redux/actions/product.actions";
import EditProductModal from "./EditProductModal";

const ProductListPage = () => {
  const { products, loading } = useSelector((state) => state.product);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.getAllProducts());
  }, [dispatch]);
  return (
    <Row>
      <Col md={12}>
        <h2>Product List</h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ListGroup variant="flush">
              {products.map((p) => (
                <ListGroup.Item key={p._id}>
                  <Row className="align-items-center">
                    <Col md={1}>
                      <Image
                        src={p.images[0].imageUrl}
                        alt={p.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product${p._id}`}>{p.name}</Link>
                    </Col>
                    <Col md={4}>{p.description}</Col>
                    <Col md={2}>${p.price}</Col>
                    <Col>
                      <EditProductModal product={p} />
                      <Button
                        onClick={() =>
                          dispatch(productActions.deleteProduct(p._id))
                        }
                        variant="light"
                        size="sm"
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
    </Row>
  );
};
export default ProductListPage;
