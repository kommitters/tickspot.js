import axios from 'axios';

/**
 * This will contain methods and data common to all resources.
 */
class BaseResource {
  constructor({ auth, baseURL, agentEmail }) {
    this.baseURL = baseURL;
    this.DEFAULT_HEADERS = {
      Authorization: auth,
      'User-Agent': `tickspot.js (${agentEmail})`,
    };
  }

  /**
   * This performs a request using axios.
   *
   * @param {String} URL endpoint to make the request.
   * @param {String} method HTTP method.
   * @param {object} body request data.
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns request data or an error if the process fails.
   */
  async makeRequest({
    URL, method, params, body, responseCallback,
  }) {
    if (responseCallback && typeof responseCallback !== 'function') {
      throw new Error('responseCallback must be a function');
    }

    let response;
    if (method === 'get') {
      response = await axios
        .get(URL, { headers: this.DEFAULT_HEADERS, params })
        .catch((error) => { throw new Error(`Request Error: ${error.response.status}`); });
    } else if (method === 'post') {
      response = await axios
        .post(URL, body, { headers: this.DEFAULT_HEADERS })
        .catch((error) => { throw new Error(`Request Error: ${error.response.status}`); });
    } else if (method === 'put') {
      response = await axios
        .put(URL, body, { headers: this.DEFAULT_HEADERS })
        .catch((error) => { throw new Error(`Request Error: ${error.response.status}`); });
    } else if (method === 'delete') {
      response = await axios
        .delete(URL, { headers: this.DEFAULT_HEADERS })
        .catch((error) => { throw new Error(`Request Error: ${error.response.status}`); });

      return response.status === 204;
    }

    return responseCallback ? responseCallback(response.data) : response.data;
  }
}

export default BaseResource;
