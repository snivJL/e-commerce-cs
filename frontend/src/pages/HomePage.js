import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../redux/actions/product.actions";
import Loader from "../components/layout/Loader";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/products/Product";
import TopProductsCarousel from "../components/products/TopProductsCarousel";

const HomePage = () => {
  const dispatch = useDispatch();
  const keywords = useParams().keywords;
  const { products, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(productActions.getAllProducts(keywords));
  }, [dispatch, keywords]);
  return (
    <>
      <Row>
        {loading ? (
          <Loader />
        ) : (
          <>
            <TopProductsCarousel products={products} />
            {products.map((p) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={p} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};

export default HomePage;
