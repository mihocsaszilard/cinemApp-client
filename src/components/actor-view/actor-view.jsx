import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./actor-view.scss";

export class ActorView extends React.Component {
  render() {
    const { actor } = this.props;
    return (
      <Container className="mt-5">
        <Col>
          <Row className="text-white ">
            <h1 className="aqua-text">{actor.Name}</h1>
          </Row>
          <Row className="text-white">
            <p className="actor-birth">{actor.Birth}</p>
            <p className="actor-bio">{actor.Bio}</p>
          </Row>
        </Col>
      </Container>
    );
  }
}

ActorView.propTypes = {
  actor: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
};
