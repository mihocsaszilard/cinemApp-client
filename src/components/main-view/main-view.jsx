import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ActorView } from "../actor-view/actor-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";

import {
  Row,
  Col,
  Button,
  Container,
  Navbar,
  Image,
  Nav,
} from "react-bootstrap";
import logo from "url:../../../public/img/CinemApp2.png";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token"); //get the value of token from localStorage
    if (accessToken !== null) {
      //if the accessToken is present
      this.setState({
        user: localStorage.getItem("user"), //-> user is logged in
      });
      this.getMovies(accessToken); //get /movies endpoint
      this.getDirectors(accessToken);
      this.getGenres(accessToken);
      this.getActors(accessToken);
      this.getUserFavs(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://cinemapp-backend.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDirectors(token) {
    axios
      .get("https://cinemapp-backend.herokuapp.com/directors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // assign result to the state
        this.setState({
          directors: response.data,
        });
        //console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGenres(token) {
    axios
      .get("https://cinemapp-backend.herokuapp.com/genres", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          genres: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getActors(token) {
    axios
      .get("https://cinemapp-backend.herokuapp.com/actors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          actors: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserFavs(token) {
    axios
      .get(
        "https://mymovies-db-api.herokuapp.com/users/" +
          localStorage.getItem("user"),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
        //console.log(response.data)
      });
  }

  /*When a movie is clicked, this function is invoked and updates 
  the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onRegistration(user) {
    this.setState({
      user,
    });
  }

  /* When a user successfully logs in, this function updates the
   `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user, favoriteMovies, directors, genres, actors } =
      this.state;
    return (
      <Router>
        <Navbar
          className="full-black custom-navbar "
          collapseOnSelect
          expand="lg"
          sticky="top"
          variant="dark"
        >
          {" "}
          <div className="cinemapp-logo">
            <Link to={`/`}>
              <Image
                alt=""
                src={logo}
                className="navbar-logo d-inline-block align-top"
              />
            </Link>
          </div>
          <Navbar.Brand>
            <Col className="toggle-nav d-block text-right">
              <Navbar.Toggle aria-controls="responsive-navbar-nav " />
              <Navbar.Collapse id="basic-navbar-nav hamburger-button ">
                <Nav.Link>
                  <Link className="custom-link" to={`/`}>
                    Movies
                  </Link>
                </Nav.Link>

                <Nav.Link>
                  <Link className="custom-link" to={`/directors`}>
                    Directors
                  </Link>
                </Nav.Link>

                <Nav.Link>
                  <Link className="custom-link" to={`/genres`}>
                    Genres
                  </Link>
                </Nav.Link>

                <Nav.Link>
                  <Link className="custom-link" to={`/actors`}>
                    Actors
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="custom-link" to={`/users`}>
                    Profile
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    className="logout-button "
                    variant="outline-danger"
                    onClick={() => {
                      this.onLoggedOut();
                    }}
                  >
                    Logout
                  </Button>
                </Nav.Link>
              </Navbar.Collapse>
            </Col>
          </Navbar.Brand>
        </Navbar>

        <Row className="main-view justify-content-center ">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return movies.map((m) => (
                <Col sm={12} md={6} lg={4} xl={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => {
                      history.goBack();
                    }}
                  />
                </Col>
              );
            }}
          />

          {/* DIRECTORS */}
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col>
                  <DirectorView
                    director={directors.find(
                      (m) => m.Name === match.params.name
                    )}
                    onBackClick={() => {
                      history.goBack();
                    }}
                  />{" "}
                  <Button
                    className=" mt-4"
                    variant="outline-light"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Back
                  </Button>
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/directors"
            render={() => {
              return directors.map((m) => (
                <Col md={12} xl={6} key={m._id}>
                  <DirectorView director={m} />
                </Col>
              ));
            }}
          />

          {/* GENRES */}
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={genres.find((m) => m.Name === match.params.name)}
                    onBackClick={() => {
                      history.goBack();
                    }}
                  />
                  <Button
                    className=" mt-4"
                    variant="outline-light"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Back
                  </Button>
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/genres"
            render={() => {
              return genres.map((m) => (
                <Col md={12} xl={6} key={m._id}>
                  <GenreView genre={m} />
                </Col>
              ));
            }}
          />

          {/* ACTORS */}

          <Route
            path="/actors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ActorView
                    actor={actors.find((m) => m.Name === match.params.name)}
                    onBackClick={() => {
                      history.goBack();
                    }}
                  />
                  <Button
                    className=" mt-4"
                    variant="outline-light"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Back
                  </Button>
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/actors"
            render={() => {
              return actors.map((m) => (
                <Col md={12} xl={6} key={m._id}>
                  <ActorView actor={m} />
                </Col>
              ));
            }}
          />

          {/* USERS */}
          <Route
            exact
            path="/users"
            render={() => {
              console.log(favoriteMovies);
              return favoriteMovies.map((m) => (
                <Col md={9} key={m._id}>
                  <ProfileView favoriteData={m} />
                </Col>
              ));
            }}
          />
        </Row>
        <div className="light-animation"></div>
      </Router>
    );
  }
}

export default MainView;
