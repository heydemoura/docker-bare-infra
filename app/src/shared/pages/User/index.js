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
      User.fetchInitialState(this.props.match.params)
        .then(user => this.setState({user}))
        .catch(error => this.setState({...this.state, error: error.response.data}))
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
      )
    } else {
      return <h1>{error.message}</h1>
    }
  }

}
