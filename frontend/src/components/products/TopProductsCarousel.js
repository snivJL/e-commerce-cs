import React, { useRef } from "react";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopProductsCarousel = ({ products }) => {
  const styles = {
    height: 400,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
  };

  const slider = useRef();
  const onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  return (
    <Row>
      <Col md={12}>
        <h2 className="ml-5">Top Products</h2>
        <RBCarousel
          className="carousel-fade"
          animation={true}
          autoplay={false}
          slideshowSpeed={2000}
          defaultActiveIndex={0}
          leftIcon="<"
          rightIcon=">"
          onSelect={onSelect}
          ref={slider}
          version={4}
        >
          {products
            .sort((a, b) => b.rating - a.rating)
            .map((i) => (
              <div style={{ ...styles }}>
                <Link key={i._id} to={`/product/${i._id}`}>
                  <Image
                    className="carousel-image"
                    fluid
                    src={i.images[0].imageUrl}
                    alt="product"
                  ></Image>
                </Link>
                <div className="carousel-caption">{i.name}</div>
              </div>
            ))
            .slice(0, 5)}
        </RBCarousel>
      </Col>
    </Row>
  );
};

export default TopProductsCarousel;
