import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios
      .get("https://cinemapp-backend.herokuapp.com/genres")
      .then((response) => {
        this.setState({
          genres: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImgPath} />
        </div>
        <div className="movie-body">
          <div className="movie-title">
            <span className="label"> </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-genre">
            <span className="label"></span>
            {movie.Genre.map((Genre) => (
              <span key={Genre._id} className="value">
                {Genre.Name}
              </span>
            ))}
          </div>
          <div className="movie-description">
            <span className="label"> </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-director">
            <span className="label">Directed by </span>
            {movie.Director.map((Director) => (
              <span key={Director._id} className="value">
                {Director.Name}
              </span>
            ))}
          </div>
          <div className="movie-actors">
            <span className="label">Casting </span>
            {movie.Actors.map((Actors) => (
              <span key={Actors._id} className="value actors">
                {Actors.Name}
              </span>
            ))}
          </div>

          <button
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </button>
        </div>
      </div>
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
