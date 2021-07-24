import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// import "./registration-view.scss";
import logo from "url:../../../public/img/CinemApp2.png";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegistration(username);
  };

  return (
    <>
      <img className="w-25 d-flex mx-auto mt-5" src={logo} />
      <div className="text-center mt-5 register text-light">
        If you don`t have an account please register!
      </div>
      <Form className="w-25 m-auto mt-5">
        <Form.Group className="mb-3  " controlId="formBasicUsername">
          <FloatingLabel controlId="username" label="Username">
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="email" label="Email address">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
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

        <Form.Group className="mb-3" controlId="formBasicBirthDate">
          <FloatingLabel controlId="birthdate" label="Birth date">
            <Form.Control
              type="date"
              placeholder="Birth date"
              onChange={(e) => setBirthdate(e.target.value)}
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
    </>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};
