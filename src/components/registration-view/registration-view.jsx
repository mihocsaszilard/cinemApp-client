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

import "./registration-view.scss";
import logo from "url:../../../public/img/CinemApp2.png";

export function RegistrationView(props) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");

  const { handleLogin } = props;

  // let history = useHistory();

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
        alert("Registration successfull! Please Login.");
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        alert("This user is already registered.");
        console.log("error registering the user");
      });
  };

  // function handleClick() {
  //   history.push("/");
  // }

  return (
    <>
      <Container>
        <Col xs={12} md={8} lg={6} className="d-flex mt-md-5 mx-auto">
          <Row className="d-flex mx-auto mt-5 justify-content-center">
            <Image className="mt-2 mt-5 logo" src={logo} />

            <Row>
              <Form className="full-black m-auto mt-3">
                <Row>
                  <Col className=" text-center " sm={12} md={6}>
                    <Form.Group
                      className="mb-3 "
                      controlId="formBasicFirstname"
                    >
                      <FloatingLabel
                        className="d-flex justify-content-start"
                        controlId="firstname"
                        label="First name"
                      >
                        <Form.Control
                          type="string"
                          placeholder="First name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="formBasicLastname">
                      <FloatingLabel controlId="lastname" label="Last name">
                        <Form.Control
                          type="string"
                          placeholder="Last name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <FloatingLabel controlId="username" label="*Username">
                        <Form.Control
                          type="string"
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
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
                  </Col>
                  <Button
                    className="d-flex m-auto w-auto mt-5 justify-content-center"
                    variant="outline-success"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Row>
              </Form>
            </Row>
            <Row
              className=" text-center text-light d-inline-block"
              xs={12}
              md={8}
              lg={6}
            >
              <Col
                className="mt-5 w-100 text-light d-flex"
                xs={12}
                md={8}
                lg={6}
              >
                <div className="pt-2 d-flex m-auto">
                  Back to login
                  <Button
                    className="w-auto pb-2 py-0 d-flex"
                    variant="link"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </div>
              </Col>
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
