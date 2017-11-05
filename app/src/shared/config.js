/**
 * API Endpoints configuration
 * @module reactapp/config
 */

/**
 * URL of the api to be used
 */
const API_URL = "http://api.github.com";

/**
 * API configuration object
 * @alias module:rectapp/config.api
 */
export const api = {
  /**
   * User profile request configuration
   * @param {string} username - GitHub username
   * @returns {Object} - Request configuration
   */
  getUser: username => ({
    method: 'GET',
    url: API_URL + `/users/${username}`
  }),

  /**
   * User repositories request configuration
   * @param {string} username - GitHub username
   * @returns {Object} - Request configuration
   */
  getUserRepos: username => ({
    method: 'GET',
    url: API_URL + `/users/${username}/repos`
  })
}
