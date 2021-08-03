import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
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
      <Col xs={12} md={8} lg={6} className="d-flex mx-auto">
        <Row className="d-flex mx-auto mt-5 justify-content-center">
          <h3 className="text-center text-light">Welcome to</h3>
          <Image className="w-75 d-flex mx-auto mt-2" src={logo} />

          <h2 className="text-center mt-5 text-light">Please login</h2>
          <Row>
            <Form className=" m-auto mt-3">
              <Form.Group className="mb-3" controlId="formBasicUsername">
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
          </Row>

          <Row
            className=" text-center mt-5 register text-light d-inline-block"
            xs={12}
            md={8}
            lg={6}
          >
            <div className="  d-inline-block text-right">Or</div>
            <Button
              className="w-25 d-inline-block"
              variant="success"
              type="submit"
              onClick={RegistrationView}
            >
              Register
            </Button>
            <div className=" d-inline-block">now!</div>
          </Row>
        </Row>
      </Col>
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
