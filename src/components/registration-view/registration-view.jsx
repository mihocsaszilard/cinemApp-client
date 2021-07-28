import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  Button,
  FloatingLabel,
  Container,
} from "react-bootstrap";

// import "./registration-view.scss";
import logo from "url:../../../public/img/CinemApp2.png";

export function RegistrationView(props) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://cinemapp-backend.herokuapp.com/users", {
        FirstName: firstname,
        LastName: lastname,
        Username: username,
        Password: password,
        Email: email,
        Birth: birth,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  function handleClick() {
    history.push("/");
  }

  return (
    <>
      <Container>
        <Col xs={12} md={8} lg={6} className="d-flex mx-auto">
          <Row className="d-flex mx-auto mt-5 justify-content-center">
            <h3 className="text-center text-light">Welcome to</h3>
            <Image className="w-75 d-flex mx-auto mt-2" src={logo} />
            <h2 className="text-center mt-5 text-light">
              Please fill in all required fields
            </h2>
            <Row>
              <Form className=" m-auto mt-3">
                <Row>
                  <Col className=" mt-2">
                    <Form.Group
                      className="mb-3 w-50 d-inline-block "
                      controlId="formBasicFirstname"
                    >
                      <FloatingLabel
                        className="d-flex justify-content-start"
                        controlId="firstname"
                        label="First name"
                      >
                        <Form.Control
                          className="py-0"
                          type="string"
                          placeholder="First name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      className="mb-3 w-50 d-inline-block "
                      controlId="formBasicLastname"
                    >
                      <FloatingLabel controlId="lastname" label="Last name">
                        <Form.Control
                          className="py-0"
                          type="string"
                          placeholder="Last name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <FloatingLabel controlId="username" label="*Username">
                    <Form.Control
                      type="string"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel controlId="email" label="*Email address">
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FloatingLabel controlId="password" label="*Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthDate">
                  <FloatingLabel controlId="birthdate" label="*Birth date">
                    <Form.Control
                      type="date"
                      placeholder="Birth date"
                      onChange={(e) => setBirth(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button
                  className="d-flex m-auto mt-5 justify-content-center"
                  variant="success"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Form>
            </Row>
            <Row
              className=" text-center mt-5 text-light d-inline-block"
              xs={12}
              md={8}
              lg={6}
            >
              <div className="d-inline-block text-right">Or</div>
              <Button
                className="w-25 d-inline-block"
                variant="outline-success"
                type="submit"
                onClick={handleClick}
              >
                Login
              </Button>
              <div className=" d-inline-block">now!</div>
            </Row>
          </Row>
        </Col>
      </Container>
    </>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
  }),
};
