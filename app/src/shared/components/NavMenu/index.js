/** NavMenu Component **/
import React from "react";
import "./NavMenu.css";

/**
 * Renders a navigation menu with links
 */
export default props => (
  <div className="navmenu">
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/blog">Blog</a>
      </li>
    </ul>
  </div>
)
