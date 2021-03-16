import React, { useRef } from "react";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopProductsCarousel = ({ products }) => {
  const slider = useRef();
  const onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  return (
    <Row>
      <Col md={12}>
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
            .map((i) => (
              <Link to={`/product/${i._id}`}>
                <Image fluid src={i.images[0].imageUrl} alt="product"></Image>
              </Link>
            ))
            .slice(0, 5)}
        </RBCarousel>
      </Col>
    </Row>
  );
};

export default TopProductsCarousel;
