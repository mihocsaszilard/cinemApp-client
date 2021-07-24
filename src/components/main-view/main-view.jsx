import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://cinemapp-backend.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates 
  the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  /* When a user successfully logs in, this function updates the
   `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is not registered user, the RegisterView is rendered. If there is a user registered,
     the user details are *passed as a prop to the LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    /* If there is no user, the LoginView is rendered. If there is a user logged in,
     the user details are *passed as a prop to the LoginView*/
    if (!user)
      return (
        <RegistrationView
          onRegistration={(user) => this.onRegistration(user)}
        />
      );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {
          /*If the state of `selectedMovie` is not null, that selected movie 
          will be returned otherwise, all *movies will be returned*/
          selectedMovie ? (
            <Row className="justify-content-md-center">
              <Col sm={12} md={9}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-md-center">
              {movies.map((movie) => (
                <Col sm={12} md={9} lg={4} xl={3}>
                  <MovieCard
                    key={movie._id}
                    movieData={movie}
                    onMovieClick={(newSelectedMovie) => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </Row>
          )
        }
      </div>
    );
  }
}

export default MainView;
