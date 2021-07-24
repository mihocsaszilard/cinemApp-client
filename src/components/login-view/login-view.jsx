import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// import "./login-view.scss";
import logo from "url:../../../public/img/CinemApp2.png";
import { RegistrationView } from "../registration-view/registration-view";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    //send a request to the server foe authentication
    //then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <>
      <img className="w-25 d-flex mx-auto mt-5" src={logo} />
      <div className="text-center text-light">welcomes you!</div>
      <div className="text-center mt-5 text-light">Please login</div>
      <Form className="w-25 m-auto mt-3">
        <Form.Group className="mb-3  " controlId="formBasicUsername">
          <FloatingLabel controlId="username" label="Username">
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="password" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Button
          className="d-flex m-auto mt-5 justify-content-center"
          variant="outline-success"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
      <Row className="w-50 m-auto mt-5">
        <Col className=" text-center mt-3 register text-light ">
          If you don`t have an account
          <Button
            className="mx-2 justify-content-center"
            variant="success"
            type="submit"
            onClick={RegistrationView}
          >
            Sign in
          </Button>
          here!
        </Col>
      </Row>
    </>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
