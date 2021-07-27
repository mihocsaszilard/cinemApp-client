import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director } = this.props;
    return (
      <Container className="director-container">
        <Col>
          <Row className="text-white ">
            <h1>{director.Name}</h1>
          </Row>
          <Row className="text-white">
            <p className="director-description">
              <span>Born:</span> {director.Birthyear}
            </p>
            <p> {director.Bio} </p>
          </Row>
        </Col>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired,
  }).isRequired,
};
