import React from "react";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <div className="card-container">
        <div
          className="movie-card"
          onClick={() => {
            onMovieClick(movieData);
          }}
        >
          <div className="card">
            {/* <div className="card-title">{movieData.Title}</div> */}
            <div>
              <img className="card-img" src={movieData.ImgPath} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
