import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <Card className="card-container h-100 ">
        <Card.Body className="card bg-dark">
          {/* <Card.Title className="card-title">{movieData.Title}</Card.Title> */}

          <div className="img-container h-100 ">
            <Card.Img
              className="card-img h-100"
              src={movieData.ImgPath}
              onClick={() => {
                onMovieClick(movieData);
              }}
            />
          </div>
        </Card.Body>
      </Card>
    );
  }
}
