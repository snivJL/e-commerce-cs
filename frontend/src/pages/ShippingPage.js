import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "../redux/actions/order.actions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};
    if (!values.address) {
      errors.address = "Required";
    }
    if (!values.city) {
      errors.city = "Required";
    }
    if (!values.postalCode) {
      errors.postalCode = "Required";
      if (!values.country) {
        errors.country = "Required";
      }
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      address: "",
      postalCode: "",
      city: "",
      country: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(orderActions.saveShippingAddress(values));
    },
  });

  return (
    <Container>
      <CheckoutSteps step1 step2 />
      <Row className="justify-content-center ">
        <Col md={6}>
          {/* {auth.error && <Alert variant="warning">{auth.error.msg}</Alert>} */}

          <Form
            onSubmit={formik.handleSubmit}
            className="align-items-center border rounded p-4"
          >
            <h2 className="text-center">Shipping Details</h2>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div>{formik.errors.address}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formGroupText">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div>{formik.errors.city}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formGroupText">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
              />
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <div>{formik.errors.postalCode}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formGroupText">
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
            <Button type="submit" block>
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPage;
