import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardDeck,
  Form,
  Col,
  Row,
  FloatingLabel,
} from "react-bootstrap";
import "./profile-view.scss";

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
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
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
      <Row className="profile-view">
        <Card className="profile-card full-black">
          <h2 className="text-light">Favorites Movies</h2>
          <Card.Body>
            {FavoriteMovies.length === 0 && (
              <div className="text-center text-light">
                Your favorite movies!
              </div>
            )}

            <Row>
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((m) => m._id === movie._id)
                  ) {
                    return (
                      <Col className="movie-card-deck">
                        <Card key={movie._id}>
                          <Card.Img variant="top" src={movie.ImgUrl} />
                          <Card.Body>
                            <Button
                              size="sm"
                              className="profile-button remove-favorite"
                              variant="danger"
                              value={movie._id}
                              onClick={(e) =>
                                this.removeFavouriteMovie(e, movie)
                              }
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  }
                })}
            </Row>
          </Card.Body>

          <Row className="w-50 m-auto">
            <h1 className="text-light">Update Profile</h1>
            <Form
              noValidate
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
                        onChange={(e) => this.setFirstName(e.target.value)}
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
                        onChange={(e) => this.setLastName(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <FloatingLabel controlId="username" label="Username">
                  <Form.Control
                    type="username"
                    placeholder="Username"
                    onChange={(e) => this.setUsername(e.target.value)}
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

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="email" label="Email address">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => this.setEmail(e.target.value)}
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

              <Card.Body>
                <Button
                  className="mx-3"
                  variant="outline-success"
                  type="submit"
                >
                  Update
                </Button>
                <Button
                  className="mx-3"
                  variant="outline-danger"
                  onClick={(e) => this.handleDeleteUser(e)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Form>
          </Row>
        </Card>
      </Row>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};
