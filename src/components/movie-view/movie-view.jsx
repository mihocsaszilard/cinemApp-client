import React from "react";
import axios from "axios";

import "./movie-view.scss";

export class MovieView extends React.Component {
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
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director}</span>
          </div>
          <div className="movie-actors">
            <span className="label">Actors: </span>
            <span className="value">{movie.Actors}</span>
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
