import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "../redux/actions/order.actions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentPage = () => {
  const history = useHistory();

  const shippingAddress = useSelector((state) => state.order.shippingAddress);
  if (!shippingAddress) history.push("/shipping");
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};
    if (!values.paymentMethod) {
      console.log("HERE", values);
      errors.paymentMethod = "Required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      paymentMethod: "paypal",
    },
    validate,
    onSubmit: (values) => {
      console.log("submit", values);
      dispatch(orderActions.savePaymentMethod(values));
    },
  });

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />
      <Row className="justify-content-center ">
        <Col md={6}>
          <Form
            onSubmit={formik.handleSubmit}
            className="align-items-center border rounded p-4"
          >
            <h2 className="text-center">Payment Method</h2>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="Paypal or credit card"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></Form.Check>
                <Form.Check
                  type="radio"
                  label="Zalo Pay"
                  id="zalo"
                  name="paymentMethod"
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></Form.Check>
              </Col>
              {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                <div>{formik.errors.paymentMethod}</div>
              ) : null}
            </Form.Group>

            <Button type="submit" block>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
