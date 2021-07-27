import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { DirectorView } from "../director-view/director-view";
import { RegistrationView } from "../registration-view/registration-view";

import { Row, Col, Button } from "react-bootstrap";

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

  // getDirectors(token) {
  //   axios
  //     .get("https://cinemapp-backend.herokuapp.com/directors", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       //assign the result to the state
  //       this.setState({
  //         director: response.data,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

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
    const { movies, user, directors } = this.state;

    return (
      <Router>
        <Button
          className="logout-button"
          variant="outline-danger"
          onClick={() => {
            this.onLoggedOut();
          }}
        >
          Logout
        </Button>
        <Row className="main-view justify-content-center">
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
                <Col md={3} key={m._id}>
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
                <Col md={8}>
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
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
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

export default MainView;
