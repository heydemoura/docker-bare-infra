import React from "react";
import axios from "axios";
import User from "../User";
import NavMenu from "../../components/NavMenu";

import "./Home.css";

export default class Home extends React.Component {
  constructor (props) {
    super(props);

    let initialState;
    if (__isBrowser__) {
      initialState = window.__initialState__;
      delete window.__initialState__;
    } else {
      initialState = props.staticContext.initialState;
    }

    this.state = { ...initialState }
  }

  handleUsernameChange ({currentTarget: { value: username }}) {
    this.setState({ ...this.state, username})
  }

  handleSubmit (e) {
    const { username } = this.state;
    this.props.history.push(`user/${username}`);
  }

  render() {
    const { handleSubmit, handleUsernameChange } = this;
    return (
      <div className="page">
        <h1>Super Duper Server Side Rendered React App</h1>
        <NavMenu />
        <div className="content">
          <form onSubmit={handleSubmit.bind(this)}>
            <label>
              GitHub Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={handleUsernameChange.bind(this)}
              placeholder="Search for a GitHub User" />
            <button type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    )
  }
}
