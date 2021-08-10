import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";

import { connect } from "react-redux";
import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ActorView } from "../actor-view/actor-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";

import { Row, Col, Button, Navbar, Nav, Image } from "react-bootstrap";
import logo from "url:../../../public/img/CinemApp.png";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      user: null,
      directors: [],
      genres: [],
      actors: [],
      selectedMovie: null,
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
    }
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
    // console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    this.getDirectors(authData.token);
    this.getGenres(authData.token);
    this.getActors(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    <Redirect push to="/" />;
    this.setState({
      user: null,
    });
  }

  getMovies(token) {
    axios
      .get("https://cinemapp-backend.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
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

  render() {
    let { user, directors, genres, actors } = this.state;
    let { movies } = this.props;

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
              <Navbar.Collapse
                className="nav-elements"
                id="basic-navbar-nav hamburger-button "
              >
                <Nav.Link className="custom-link mx-3" href="/">
                  Movies
                </Nav.Link>

                <Nav.Link className="custom-link mx-3" href="/directors">
                  Directors
                </Nav.Link>

                <Nav.Link className="custom-link mx-3" href="/genres">
                  Genres
                </Nav.Link>

                <Nav.Link className="custom-link mx-3" href="/actors">
                  Actors
                </Nav.Link>

                <Nav.Link className="custom-link mx-3" href="/users/:username">
                  Profile
                </Nav.Link>

                <Button
                  className="logout-button  mx-3"
                  variant="outline-danger"
                  onClick={() => {
                    this.onLoggedOut();
                  }}
                >
                  Logout
                </Button>
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
              if (movies.length === 0) return <div className="main-view" />;

              return <MoviesList movies={movies} />;
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
            path="/users/:username"
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                );
              if (movies.length === 0) return;
              return <ProfileView history={history} movies={movies} />;
            }}
          />
          <Route
            path="/profile"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <ProfileView />
                  </Col>
                );
            }}
          />
        </Row>
        <div className="light-animation"></div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
