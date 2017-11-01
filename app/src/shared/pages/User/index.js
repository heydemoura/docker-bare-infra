import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

    this.state = { user: initialState };
  }

  componentDidMount() {
    if (!this.state.user) {
      User.fetchInitialState()
        .then(user => this.setState({user}));
    }
    
  }

  static fetchInitialState() {
    return axios({
      method: "GET",
      url: "https://api.github.com/users/heydemoura"
    })
    .then(response => response.data)
    .catch(error => console.log(error));
  }

  render () {
    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <ul>
          <li><Link to={"/user/" + this.state.user.login + "/repos"}>Repositories</Link></li>
        </ul>
      </div>
    )
  }

}
