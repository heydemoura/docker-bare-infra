/** Repository Component **/
import React from "react";

import "./Repository.css"

/**
 * Renders a card with repository info
 */
export default props => (
  <div className="repository">
    <div className="repository-name">
      <h3>{props.name}</h3>
    </div>
    <div className="repository-link">
      <a href={props.html_url}>View on GitHub</a>
    </div>
    <div className="repository-data">
      <div>👀{props.watchers}</div>
      <div>⭐{props.stargazers_count}</div>
      <div>🍴{props.forks}</div>
    </div>
  </div>
)
