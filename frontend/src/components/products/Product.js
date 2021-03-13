import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  console.log(product);
  return (
    <Card className="my-3 p3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.images[0].imageUrl}
          style={{ minHeight: "124px" }}
          variant="top"
        ></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.price}</Card.Text>
        <Rating value={Math.random() * 5} />
      </Card.Body>
    </Card>
  );
};

export default Product;
