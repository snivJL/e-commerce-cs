import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import productActions from "../../redux/actions/product.actions";

const CreateProductPage = () => {
  const [inputs, setInputs] = useState(1);
  const [array, setArray] = useState(["image"]);
  const dispatch = useDispatch();
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
    } else if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
        values.images[0]
      )
    )
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
      dispatch(productActions.createProduct(values));
    },
  });
  const handleInputs = (e) => {
    e.preventDefault();
    if (e.target.name === "add") {
      setInputs((inputs) => inputs + 1);
      setArray([...array, `image${inputs + 1}`]);
    } else {
      setInputs((inputs) => inputs - 1);
      array.splice(-1, 1);
      setArray(array);
    }
  };
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);
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
              <Form.Label>Image Links</Form.Label>
              <Button
                onClick={(e) => handleInputs(e)}
                className="ml-2"
                variant="light"
                size="sm"
                name="add"
              >
                Add
              </Button>

              <Button
                onClick={(e) => handleInputs(e)}
                className="ml-2"
                variant="light"
                size="sm"
                name="remove"
                disabled={inputs <= 1}
              >
                Remove
              </Button>

              {array.map((input, index) => (
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="http://..."
                    name={`image${index + 1}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // value={formik.values.images}
                  />
                </Form.Group>
              ))}

              {formik.touched.images && formik.errors.images ? (
                <div>{formik.errors.images}</div>
              ) : null}
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
