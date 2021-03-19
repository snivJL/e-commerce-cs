import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import productActions from "../../redux/actions/product.actions";

const EditProductModal = ({ order }) => {
  const { shipping, products } = order;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = useState(1);
  const [array, setArray] = useState(["name"]);
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      address: shipping.address,
      city: shipping.city,
      postalCode: shipping.postalCode,
      country: shipping.country,
      products,
    },
    validate,
    onSubmit: (values) => {
      console.log("values", values);
      // dispatch(productActions.editProduct(values));
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
      <Button
        // onClick={() => dispatch(userActions.makePayment(userId, o._id))}
        onClick={handleShow}
        style={{ backgroundColor: "#fd5c32", color: "white" }}
        className="rounded btn btn-block"
        size="sm"
        variant="light"
      >
        Update
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
                <Form.Label>Shipping</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div>{formik.errors.address}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div>{formik.errors.city}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Postal code"
                  name="postalCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postalCode}
                />
                {formik.touched.postalCode && formik.errors.postalCode ? (
                  <div>{formik.errors.postalCode}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country ? (
                  <div>{formik.errors.country}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Products</Form.Label>
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

                {formik.values.products.map((input, index) => (
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="http://..."
                      name={`products[${index + 0}].name`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={input.name}
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
