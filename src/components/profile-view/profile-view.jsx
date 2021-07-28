import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { favoriteData } = this.props;
    console.log(favoriteData, "user view");
    return (
      <Container>
        <Col>
          <Row className="text-white ">
            <h2>{favoriteData}</h2>
          </Row>
        </Col>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  favoriteData: PropTypes.shape({
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
};
