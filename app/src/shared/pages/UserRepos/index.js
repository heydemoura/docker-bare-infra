/** User Repositories Page **/
import React from "react";
import axios from "axios";
import { api } from '../../config.js';
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

    this.state = { ...initialState };
  }

  componentDidMount() {
    if (!this.state.repositories) {
      UserRepos.fetchInitialState(this.props.match.params)
        .then(repositories => this.setState({ repositories }))
        .catch(error => this.setState({...this.state, error: error.response.data}));
    }
  }

  /**
   * Fetch initial component state
   * @param {object} params - Route params
   */
  static fetchInitialState(params) {
    return axios(api.getUserRepos(params.username))
    .then(response => ({ repositories: response.data }))
    .catch(error => ({ error: error.response.data }))
  }

  handleRepositoriesData(repositories) {
    return Object.keys(repositories)
      .reduce((acc, curr, index) => (acc.push(repositories[curr]) && acc), []);
  }

  renderRepositoryList(repos, error) {
    const { handleRepositoriesData } = this;
    if (Array.isArray(repos) && repos.length ) {
      return <RepositoryList repositories={handleRepositoriesData(repos)} />;
    } else {
      return <h3>{error.message}</h3>
    }
  }

  render () {
    const { renderRepositoryList } = this;
    const { repositories, error } = this.state;
    console.log(error);
    return (
      <div className="page">
        <h1>Repositories</h1>
        { renderRepositoryList.bind(this)(repositories, error) }
      </div>
    )
  }

}
