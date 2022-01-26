import axios from 'axios';

class baseResource {
  constructor({ auth, baseURL, agentEmail }) {
    this.baseURL = baseURL;
    this.DEFAULT_HEADERS = {
      Authorization: auth,
      'User-Agent': `tickspot.js (${agentEmail})`,
    };
  }

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
    }

    return responseCallback ? responseCallback(response.data) : response.data;
  }
}

export default baseResource;
