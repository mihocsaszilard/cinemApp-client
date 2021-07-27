import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container className="director-container m-4">
        <Row className="text-white">
          <h1>{movie.Director.Name}</h1>
        </Row>
        <Row className="text-white">
          <p className="director-description">
            Born: {movie.Director.Birthyear}
          </p>
          <p>Biography: {movie.Director.Bio} </p>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  movieData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired,
  }).isRequired,
};
