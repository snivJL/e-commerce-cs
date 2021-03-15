import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import productActions from "../../redux/actions/product.actions";

const EditProductModal = ({ product }) => {
  const { name, description, price, images, _id } = product;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = useState(1);
  const [array, setArray] = useState(["image"]);
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      _id,
      name,
      description,
      price,
      images,
    },
    validate,
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(productActions.editProduct(values));
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
    <>
      <Button variant="light" onClick={handleShow}>
        <i className="fas fa-edit"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Row className="justify-content-center ">
          <Col md={12}>
            <Form
              onSubmit={formik.handleSubmit}
              className="align-items-center border rounded p-4"
            >
              <h2 className="text-center">Edit Product</h2>
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

                {formik.values.images.map((input, index) => (
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="http://..."
                      name={`images[${index + 0}].imageUrl`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={input.imageUrl}
                    />
                  </Form.Group>
                ))}

                {formik.touched.images && formik.errors.images ? (
                  <div>{formik.errors.images}</div>
                ) : null}
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default EditProductModal;
