const API_URL = "http://api.github.com";

export const api = {
  getUser: username => ({
    method: 'GET',
    url: API_URL + `/users/${username}`
  }),

  getUserRepos: username => ({
    method: 'GET',
    url: API_URL + `/users/${username}/repos`
  })
}
