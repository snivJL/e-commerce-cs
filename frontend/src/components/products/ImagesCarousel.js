import React, { useRef } from "react";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Row, Col, Image } from "react-bootstrap";

const ImagesCarousel = ({ images }) => {
  const slider = useRef();
  const onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <RBCarousel
          className="carousel-fade"
          animation={true}
          autoplay={true}
          slideshowSpeed={2000}
          defaultActiveIndex={0}
          leftIcon="<"
          rightIcon=">"
          onSelect={onSelect}
          ref={slider}
          version={4}
        >
          {images.map((i) => (
            <Image fluid src={i.imageUrl} alt="product"></Image>
          ))}
        </RBCarousel>
      </Col>
    </Row>
  );
};

export default ImagesCarousel;
