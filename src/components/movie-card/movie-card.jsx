import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import "../movie-card/movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <Card className="card-container movie-card mb-2">
        <Card.Body className="card p-0">
          {/* <Card.Title className="card-title">{movieData.Title}</Card.Title> */}

          <Image
            className="card-img"
            src={movieData.ImgPath}
            fluid
            onClick={() => {
              onMovieClick(movieData);
            }}
          />
        </Card.Body>
      </Card>
    );
  }
}
