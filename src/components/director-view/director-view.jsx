import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director } = this.props;
    return (
      <Container className="director-container mt-5">
        <Row className="text-white ">
          <h1 className="aqua-text director-name">{director.Name}</h1>
          <p className="director-description">
            <span>Born: </span>
            {new Date(director.Birthyear).toLocaleDateString()}
          </p>
        </Row>
        <Row className="d-flex text-white director-card">
          <Col>
            <img
              className="w-25 d-flex director-img"
              src={director.DirectorImg}
            />
            <p className="director-bio"> {director.Bio} </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired,
    DirectorImg: PropTypes.string,
  }).isRequired,
};
