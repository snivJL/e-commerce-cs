import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import productActions from "../../redux/actions/product.actions";

const CreateProductPage = () => {
  const [images, setImages] = useState([{}]);
  const dispatch = useDispatch();

  const widget = window.cloudinary.createUploadWidget(
    { cloudName: "dilv93gvb", uploadPreset: "coderShop", maxFileSize: 100000 },
    (error, result) => {
      // console.log(result);
      if (result.event && result.event === "success")
        setImages((images) => [
          ...images,
          { imageUrl: result.info.secure_url },
        ]);
      console.log(result);
    }
  );
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (!values.price) {
      errors.price = "Required";
    }

    if (!values.images) {
      errors.images = "Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      images: [],
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      values.images = images;
      dispatch(productActions.createProduct(values));
    },
  });

  return (
    <Container>
      <Row className="justify-content-center ">
        <Col md={6}>
          <Form
            onSubmit={formik.handleSubmit}
            className="align-items-center border rounded p-4"
          >
            <h2 className="text-center">Create Product</h2>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div>{formik.errors.price}</div>
              ) : null}
            </Form.Group>

            <Form.Group>
              {images.length > 0 &&
                images.map((i) => (
                  <Image
                    key={i}
                    style={{ width: "120px" }}
                    thumbnail
                    src={i.imageUrl}
                  ></Image>
                ))}
              <Button
                block
                className="btn btn-primary"
                onClick={() => widget.open()}
              >
                Upload images
              </Button>
            </Form.Group>

            <Button type="submit" className="btn btn-warning" block>
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPage;
