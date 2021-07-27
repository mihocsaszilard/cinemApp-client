import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../movie-card/movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card className="card-container movie-card movie-card-col mb-2">
        <Card.Body className="card p-0">
          {/* <Card.Title className="card-title">{movie.Title}</Card.Title> */}

          <Link to={`/movies/${movie._id}`}>
            <Card.Img className="card-img" src={movie.ImgPath} />
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  // onMovieClick: PropTypes.func.isRequired,
};
