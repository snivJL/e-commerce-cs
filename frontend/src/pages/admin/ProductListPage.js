import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/layout/Loader";
import { Link, useParams } from "react-router-dom";
import { Row, ListGroup, Image, Col, Button } from "react-bootstrap";
import productActions from "../../redux/actions/product.actions";
import EditProductModal from "./EditProductModal";
import Searchbar from "../../components/layout/SearchBar";

const ProductListPage = () => {
  const keywords = useParams().keywords;
  const products = useSelector((state) => state.product.products);
  const deletedProducts = useSelector((state) => state.product.deletedProducts);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.getAllProducts(keywords));
  }, [dispatch, keywords]);
  useEffect(() => {
    dispatch(productActions.getDeletedProducts());
  }, [dispatch]);
  return (
    <Row>
      <Col md={12} className="justify-content-center">
        <h2>Active Product List</h2>
        <Searchbar admin={true} />
        {loading ? (
          <Loader className="justify-self-center mx-auto" />
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
                      <Link to={`/product/${p._id}`}>{p.name}</Link>
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
            <h2>Deleted Products</h2>
            <ListGroup variant="flush">
              {deletedProducts.map((p) => (
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
                      <Link to={`/product/${p._id}`}>{p.name}</Link>
                    </Col>
                    <Col md={4}>{p.description}</Col>
                    <Col md={2}>${p.price}</Col>
                    <Col>
                      <EditProductModal product={p} />
                      <Button
                        onClick={() =>
                          dispatch(productActions.restoreProduct(p._id))
                        }
                        variant="light"
                        size="sm"
                      >
                        <i className="fas fa-trash-restore"></i>
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
