import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view mt-5">
        <Col xs={12} md={6} className="movie-poster">
          <img className="w-75" src={movie.ImgPath} />
        </Col>
        <Col xs={12} md={6} className="movie-body text-light">
          <div className="movie-title">
            <span className="label"> </span>
            <h1 className="value">{movie.Title}</h1>
          </div>
          <div className="movie-genre">
            <span className="label"></span>
            {movie.Genre.map((Genre) => (
              <h2 key={Genre._id} className="value">
                {Genre.Name}
              </h2>
            ))}
          </div>
          <div className="movie-description">
            <span className="label"> </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-director mt-5">
            <span className="label">Directed by </span>
            {movie.Director.map((Director) => (
              <h2 key={Director._id} className="value">
                {Director.Name}
              </h2>
            ))}
          </div>
          <div className="movie-actors mt-4">
            <span className="label">Casting </span>
            {movie.Actors.map((Actors) => (
              <h2 key={Actors._id} className="value actors">
                {Actors.Name}
              </h2>
            ))}
          </div>

          <Button
            className=" mt-4"
            variant="outline-light"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
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
  // onMovieClick: PropTypes.func.isRequired,
};
