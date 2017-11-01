import React from "react";
import Repository from "../Repository";
import "./RepositoryList.css";

const renderRepositoryList = (item, index) => {
  return (
    <Repository key={item.id} {...item}/>
  )
}

export default props => (
  <div className="repository-list">
    {
      props.repositories && props.repositories.map(renderRepositoryList)
    }
  </div>
)
