import React, { useEffect } from "react";
import userActions from "../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "../components/layout/Loader";

const MyOrdersPage = () => {
  const userId = useParams().id;
  const dispatch = useDispatch();
  const { myOrders, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userActions.getUserOrders(userId));
  }, [dispatch, userId]);
  return (
    <Row>
      <Col md={12}>
        {loading ? (
          <Loader />
        ) : (
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total</th>
                <th>Shipping</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o) => (
                <tr>
                  <td>{o._id}</td>
                  <td>{o.status}</td>
                  <td>
                    {o.products.map((p) => (
                      <tr>{p.name}</tr>
                    ))}
                  </td>
                  <td>{o.total}</td>

                  <td>
                    <tr>{o.shipping.address}</tr>
                    <tr>{o.shipping.city}</tr>
                    <tr>{o.shipping.postalCode}</tr>
                    <tr>{o.shipping.country}</tr>
                  </td>
                  <td>
                    {o.status === "pending" && (
                      <Button
                        onClick={() =>
                          dispatch(userActions.makePayment(userId, o._id))
                        }
                        style={{ backgroundColor: "#fd5c32", color: "white" }}
                        className="rounded"
                        size="sm"
                        variant="light"
                      >
                        Pay Now
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default MyOrdersPage;
