import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from '../../config.js';

export default class User extends React.Component {
  constructor (props) {
    super(props);

    let initialState;
    if (__isBrowser__) {
      initialState = window.__initialState__;
      delete window.__initialState__;
    } else {
      initialState = props.staticContext.initialState;
    }

    this.state = { ...initialState };
  }

  componentDidMount() {
    if (!this.state.user) {
      return User.fetchInitialState(this.props.match.params)
        .then(({user, error}) => this.setState({user, error}))
    }
  }

  static fetchInitialState(params) {
    return axios(api.getUser(params.username))
    .then(response => ({ user: response.data }))
    .catch(error => ({ error: error.response.data }));
  }

  render () {
    const { user, error } = this.state;

    if (user) {
      return (
        <div>
          <h1>{this.state.user.name}</h1>
          <ul>
            <li><a href={`/user/${user.login}/repos`}>Repositories</a></li>
          </ul>
        </div>
      );
    } else if (error && error.message) {
      return <h1>{error && error.message}</h1>;
    }

    return <h1>Loading</h1>;
    
  }
}
