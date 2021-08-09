import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addToFavorites() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(
        `https://cinemApp-backend.herokuapp.com/users/${user}` +
          "/movies/" +
          this.props.movie._id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        // console.log(response);
        alert(this.props.movie.Title + " is added to favorites!");
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Row className="movie-view mt-5 m-auto ">
        <Col md={12} lg={6} className="movie-poster ">
          <img className="w-100" src={movie.ImgPath} />
        </Col>
        <Col md={12} lg={6} className="movie-body text-light my-auto">
          <div className="movie-title">
            <span className="label"> </span>
            <h1 className="value aqua-text">{movie.Title}</h1>
          </div>
          <div className="movie-genre">
            <span className="label"></span>
            {movie.Genre.map((Genre) => (
              <Link key={Genre._id} to={`/genres/${Genre.Name}`}>
                <Button className="custom-link " variant="link">
                  <h4>{Genre.Name}</h4>
                </Button>
              </Link>
            ))}
          </div>
          <div className="movie-description">
            <span className="label"> </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-director mt-5">
            <span className="label">Directed by:</span>
            {movie.Director.map((Director) => (
              <Link key={Director._id} to={`/directors/${Director.Name}`}>
                <Button className="custom-link " variant="link">
                  <h3>{Director.Name}</h3>
                </Button>
              </Link>
            ))}
          </div>
          <div className="movie-actors mt-4">
            <span className="label">Casting </span>
            <h2>
              {" "}
              {movie.Actors.map((Actor) => (
                <Link key={Actor._id} to={`/actors/${Actor.Name}`}>
                  <Button className="custom-link " variant="link">
                    <h3>{Actor.Name}</h3>
                  </Button>
                </Link>
              ))}
            </h2>
          </div>

          <Button
            className="mx-2 mt-4"
            variant="outline-light"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
          <Button
            className="mx-2 mt-4"
            variant="outline-success"
            onClick={() => this.addToFavorites(movie)}
          >
            + Add To Favorites
          </Button>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImgPath: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
  }),
};
