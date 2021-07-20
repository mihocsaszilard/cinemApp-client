import React from "react";
import PropTypes from "prop-types";

import "./movie-card.scss";
import "../../settings/typography.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <div
        className="movie-card"
        onClick={() => {
          onMovieClick(movieData);
        }}
      >
        {movieData.Title}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImgPath: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
