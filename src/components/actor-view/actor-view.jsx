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
        <Row className="text-white ">
          <h1 className="aqua-text actor-name">{actor.Name}</h1>
          <p className="actor-birth mt-2">
            <span>Born: </span>
            {new Date(actor.Birth).toLocaleDateString()}
          </p>
          {/* <Col xs={12} md={5}></Col> */}
        </Row>
        <Row>
          <Col className="text-white dates-container">
            {" "}
            <img className="actor-img w-25 m-auto " src={actor.ActorImg} />
            <p className="actor-bio">{actor.Bio}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

ActorView.propTypes = {
  actor: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    ActorImg: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    ActorImg: PropTypes.string,
  }).isRequired,
};
