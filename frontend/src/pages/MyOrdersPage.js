import React, { useEffect } from "react";
import userActions from "../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Table } from "react-bootstrap";
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
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Price</th>
                <th>Items</th>
                <th>Shipping</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o) => (
                <tr>
                  <td>{o._id}</td>
                  <td>{o.status}</td>
                  <td>{o.total}</td>
                  <td>{o._id}</td>

                  <td>{o._id}</td>

                  <td>{o._id}</td>
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
