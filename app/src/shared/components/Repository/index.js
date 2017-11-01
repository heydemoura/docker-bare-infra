import React from "react";

import "./Repository.css"

export default props => (
  <div className="repository">
    <div className="repository-name">
      <h3>{props.name}</h3>
    </div>
    <div className="repository-link">
      <a href={props.html_url}>View on GitHub</a>
    </div>
    <div className="repository-data">
      <div>Watchers: {props.watchers}</div>
      <div>Stars: {props.stargazers_count}</div>
      <div>Forks: {props.forks}</div>
    </div>
  </div>
)
