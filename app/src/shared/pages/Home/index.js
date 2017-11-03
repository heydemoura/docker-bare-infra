import React from "react";
import axios from "axios";
import User from "../User";
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
      <div>
        <h1>Super Duper Server Side Rendered React App</h1>
        <div>
          <form onSubmit={handleSubmit.bind(this)}>
            <label>
              Username:
              <input type="text" name="username" onChange={handleUsernameChange.bind(this)} />
            </label>
            <button type="submit">
              Search
            </button>
          </form>
        </div>
        <a href="/blog">Blog</a>
      </div>
    )
  }
}
