import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre } = this.props;
    return (
      <Container className="mt-5">
        <Col>
          <Row className="text-white ">
            <h1 className="aqua-text genre-name">{genre.Name}</h1>
          </Row>
          <Row className="text-white">
            <p className="genre-description">{genre.Description}</p>
          </Row>
        </Col>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
