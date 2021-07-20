import React, { useState } from "react";
import PropTypes from "prop-types";

import "./login-view.scss";
import "../../settings/typography.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    //send a request to the server foe authentication
    //then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <form>
      <label className="username">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="password">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="loginBtn" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
