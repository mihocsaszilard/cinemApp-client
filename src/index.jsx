import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import logo from "url:../public/img/CinemApp2.png";

// Main component (will eventually use all the others)
class CinemApplication extends React.Component {
  render() {
    return (
      <Container>
        <Navbar
          className="full-width-black"
          collapseOnSelect
          expand="lg"
          sticky="top"
          variant="dark"
        >
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="auto"
                height="50"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
          </Container>
        </Navbar>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(CinemApplication), container);

// For all the tasks in this Achievement, you will create a new GitHub branch
// from your “myFlix-client” repo. In the development world it's generally best
//  practice to make changes to a branch and then merge that branch with the
//  master/main branch after successful verification. Developers often follow
//  this practice in their workplace.
