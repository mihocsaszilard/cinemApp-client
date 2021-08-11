import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";

import {
  Form,
  Row,
  Col,
  Image,
  Button,
  FloatingLabel,
  Container,
} from "react-bootstrap";

// import "./login-view.scss";
import logo from "url:../../../public/img/CinemApp2.png";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister } = props;
  // let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://cinemapp-backend.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        alert("Invalid username or password!");
      });
  };

  // function handleClick() {
  //   history.push("{/register}");
  // }

  return (
    <>
      <Container>
        <Col xs={12} md={8} lg={6} className="d-flex mx-auto">
          <Row className="d-flex mx-auto mt-5 justify-content-center">
            <h3 className="text-center mt-5 text-light">Welcome to</h3>
            <Image className=" mt-2 logo" src={logo} />

            <h2 className="text-center mt-5 text-light">Please login</h2>
            <Row>
              <Form className=" m-auto w-75 mt-3 full-black">
                <Form.Group className="mb-3" controlId="formUsername">
                  <FloatingLabel controlId="username" label="Username">
                    <Form.Control
                      type="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
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

            <Col className="mt-5 w-100 text-light d-flex" xs={12} md={8} lg={6}>
              <div className="pt-2 d-flex m-auto">
                Don't have an account?
                <Button
                  className="w-auto pb-2 py-0 d-flex"
                  variant="link"
                  type="submit"
                  onClick={handleRegister}
                >
                  Sign Up
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Container>
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
