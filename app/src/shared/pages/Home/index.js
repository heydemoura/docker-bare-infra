import React from "react";
import axios from "axios";

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

  render() {
    return (
      <div>
        <h1>Super Duper Server Side Rendered React App</h1>
        <ul>
          <li>
            <a href="/pokemon/1">Bulbasaur</a>
          </li>
          <li>
            <a href="/pokemon/4">Charmander</a>
          </li>
          <li>
            <a href="/pokemon/7">Squirtle</a>
          </li>
        </ul>
      </div>
    )
  }
}
