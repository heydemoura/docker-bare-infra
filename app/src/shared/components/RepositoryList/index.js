/** RepositoryList Component **/
import React from "react";
import Repository from "../Repository";
import "./RepositoryList.css";

/**
 * Auxiliar function for rendering Repostory components
 * @param {Object} item - Repository data object
 * @returns {Object} - Repository component
 */
const renderRepositoryList = item => {
  return (
    <Repository key={item.id} {...item}/>
  )
}

/**
 * Renders a list for Repository components
 */
export default props => (
  <div className="repository-list">
    {
      props.repositories && props.repositories.map(renderRepositoryList)
    }
  </div>
)
