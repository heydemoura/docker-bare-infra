import React from "react";
import axios from "axios";

import RepositoryList from '../../components/RepositoryList';

export default class UserRepos extends React.Component {
  constructor (props) {
    super(props);

    let initialState;
    if (__isBrowser__) {
      initialState = window.__initialState__;
      delete window.__initialState__;
    } else {
      initialState = props.staticContext.initialState;
    }

    this.state = { repositories: initialState };
  }

  componentDidMount() {
    if (!this.state.repositories) {
      UserRepos.fetchInitialState()
        .then(repositories => this.setState({ repositories }));
    }
  }

  static fetchInitialState() {
    return axios({
      method: "GET",
      url: "https://api.github.com/users/heydemoura/repos"
    })
    .then(response => response.data)
    .catch(error => console.log(error));
  }

  handleRepositoriesData(repositories) {
    return Object.keys(repositories)
      .reduce((acc, curr, index) => (acc.push(repositories[curr]) && acc), []);
  }

  render () {
    const { handleRepositoriesData } = this;
    const { repositories } = this.state;
    return (
      <div>
        <h1>Repositories</h1>
        { repositories ?
            <RepositoryList repositories={handleRepositoriesData(repositories)} /> :
            <h3>Something Happened</h3>
        }
      </div>
    )
  }

}
