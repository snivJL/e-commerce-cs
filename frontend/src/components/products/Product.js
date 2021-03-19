import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import AddToCartButton from "../../components/order/AddToCartButton";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p3 rounded homepage-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.images[0].imageUrl}
          // style={{ minHeight: "124px" }}
          variant="top"
        ></Card.Img>
      </Link>
      <Card.Body className="d-flex flex-column align-items-center w-100">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>
              {product.name.length > 24
                ? product.name.slice(0, 24) + "..."
                : product.name}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.price}</Card.Text>
        <Rating value={product.rating} />
        <AddToCartButton product={product} />
      </Card.Body>
    </Card>
  );
};

export default Product;
