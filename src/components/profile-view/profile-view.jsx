import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Card, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./profile-view.scss";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      FirstName: null,
      LastName: null,
      Username: null,
      Password: null,
      Email: null,
      Birth: null,
      FavoriteMovies: [],
      validated: null,
      favorites: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
      this.getUserFavs(accessToken);
    }
  }

  // get user method
  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://cinemapp-backend.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          FirstName: response.data.FirstName,
          LastName: response.data.LastName,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birth: response.data.Birth,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserFavs(token) {
    axios
      .get(
        "https://cinemapp-backend.herokuapp.com/users/" +
          localStorage.getItem("user"),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  removeFavouriteMovie() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(
        `https://cinemapp-backend.herokuapp.com/users/${username}/removeFromFav/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Removed!");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(
    e,
    newFirstName,
    newLastName,
    newUsername,
    newPassword,
    newEmail,
    newBirth
  ) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .put(`https://cinemapp-backend.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          FirstName: newFirstName ? newFirstName : this.state.FirstName,
          LastName: newLastName ? newLastName : this.state.LastName,
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birth: newBirth ? newBirth : this.state.Birth,
        },
      })
      .then((response) => {
        alert("Saved!");
        this.setState({
          FirstName: response.data.FirstName,
          LastName: response.data.LastName,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birth: response.data.Birth,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setFirstName(input) {
    this.FirstName = input;
  }

  setLastName(input) {
    this.LastName = input;
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirth(input) {
    this.Birth = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(`https://cinemapp-backend.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Your account has been removed.");
        window.open(`/`, "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view d-flex ">
        <Accordion defaultActiveKey="0" className=" m-auto custom-accordion">
          <Accordion.Item className="full-black" eventKey="0">
            <Accordion.Header>
              <h3 className="m-auto aqua-text">Update Profile</h3>
            </Accordion.Header>
            <Accordion.Body className="full-black w-100">
              <Form
                noValidate
                className="w-100 my-auto full-black"
                validated={validated}
                onSubmit={(e) =>
                  this.handleUpdate(
                    e,
                    this.FirstName,
                    this.LastName,
                    this.Username,
                    this.Password,
                    this.Email,
                    this.Birth
                  )
                }
              >
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-3  "
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
                          onChange={(e) => this.setFirstName(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <FloatingLabel controlId="username" label="Username">
                        <Form.Control
                          type="username"
                          placeholder="Username"
                          onChange={(e) => this.setUsername(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <FloatingLabel controlId="email" label="Email address">
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                          onChange={(e) => this.setEmail(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-3  "
                      controlId="formBasicLastname"
                    >
                      <FloatingLabel controlId="lastname" label="Last name">
                        <Form.Control
                          type="string"
                          placeholder="Last name"
                          onChange={(e) => this.setLastName(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <FloatingLabel controlId="password" label="Password">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) => this.setPassword(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicBirthday">
                      <FloatingLabel controlId="birthdate" label="Birthdate">
                        <Form.Control
                          type="date"
                          onChange={(e) => this.setBirth(e.target.value)}
                        />{" "}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>{" "}
                </Row>
                <Card.Body>
                  <Button
                    className="mx-3 mt-2"
                    variant="outline-success"
                    type="submit"
                  >
                    Update
                  </Button>
                  <Button
                    className="mx-3 mt-2"
                    variant="outline-danger"
                    onClick={(e) => this.handleDeleteUser(e)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className="text-light full-black m-auto" eventKey="1">
            <Accordion.Header className="text-light full-black mt-md-5">
              <h3 className="m-auto aqua-text">Favorites</h3>
            </Accordion.Header>

            <Accordion.Body className="text-center full-black" sm={12} md={6}>
              {FavoriteMovies.length === 0 && (
                <div className="text-center text-light m-auto">
                  Your don`t have favorite movies yet!
                </div>
              )}

              <div className="d-flex justify-content-center ">
                {movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((m) => m._id === movies._id)
                  ) {
                    return (
                      <Col
                        className="text-center justify-content-center"
                        key={movie._id}
                      >
                        <Row className=" aqua-text">
                          <Col
                            className="m-auto image-container-profile"
                            sm={12}
                            md={6}
                            lg={5}
                          >
                            <img
                              className="w-100 m-auto mt-2"
                              src={movie.ImgPath}
                            />

                            <Button
                              className="remove-favorite w-50 px-6 m-auto mt-2 custom-remove"
                              variant="danger"
                              value={movie._id}
                              onClick={(e) =>
                                this.removeFavouriteMovie(e, movie)
                              }
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    );
                  }
                })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    );
  }
}

ProfileView.propTypes = {
  username: PropTypes.shape({
    FavoriteMovies: PropTypes.array.isRequired,
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }),
};
