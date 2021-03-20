import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/layout/Loader";
import { Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import userActions from "../../redux/actions/user.actions";

const UserListPage = () => {
  const users = useSelector((state) => state.user.users);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    dispatch(userActions.selectUser(user));
    setShow(true);
  };

  const handleChange = (e) => setBalance(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userActions.topUpUser(selectedUser._id, balance));
    console.log(e);
  };
  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, [dispatch]);
  return (
    <Row>
      <Col md={12}>
        <h2>User List</h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td className="text-center">
                      <i
                        className={
                          u.role === "admin"
                            ? "fas fa-check fa-2x text-success"
                            : "fas fa-times fa-2x text-danger"
                        }
                      ></i>
                    </td>
                    <td className="d-flex justify-content-between">
                      {u.balance}
                      <Button
                        onClick={(user) => handleShow(u)}
                        style={{ backgroundColor: "#fd5c32", color: "white" }}
                        className="rounded"
                        size="sm"
                        variant="light"
                      >
                        Update
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Form onSubmit={handleSubmit}>
                          <Modal.Header closeButton>
                            <Modal.Title>Top Up</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form.Group controlId="formGroupEmail">
                              <Form.Label>Amount (USD)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter amount"
                                name="balance"
                                onChange={handleChange}
                                defaultValue={u.balance}
                              />
                            </Form.Group>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              type="submit"
                              variant="light"
                              onClick={handleClose}
                            >
                              Top Up
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Col>
    </Row>
  );
};
export default UserListPage;
