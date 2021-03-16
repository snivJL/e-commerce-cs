import React, { useEffect } from "react";
import userActions from "../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "../components/layout/Loader";
import EditOrderModal from "../components/order/EditOrderModal";
import Moment from "react-moment";

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
          <Table className="table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total</th>
                <th>Shipping</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o) => (
                <tr>
                  <td>
                    <Moment format="DD-MM-YYYY">{o.createdAt}</Moment>
                  </td>
                  <td
                    className={`${
                      o.status === "pending" ? "text-danger" : "text-success"
                    } font-weight-bold text-capitalize h4`}
                  >
                    {o.status}
                  </td>
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
                  <td className="d-flex flex-column align-items-center">
                    {o.status === "pending" && (
                      <Button
                        onClick={() =>
                          dispatch(userActions.makePayment(userId, o._id))
                        }
                        style={{ backgroundColor: "#fd5c32", color: "white" }}
                        className="rounded btn btn-block"
                        size="sm"
                        variant="light"
                      >
                        Pay Now
                      </Button>
                    )}
                    <EditOrderModal order={o} />
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
