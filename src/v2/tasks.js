import axios from 'axios';

/**
 * Tasks module for tickspot V2 API
 */
class Tasks {
  constructor({ auth, baseURL, agentEmail }) {
    this.baseURL = baseURL;
    this.DEFAULT_HEADERS = {
      Authorization: auth,
      'User-Agent': `tickspot.js (${agentEmail})`,
    };
  }

  /**
   * This method will return all closed tasks across all projects
   *
   * @param {callback} dataCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Array} a list of all the closed tasks.
   */
  async listClosed(dataCallback) {
    if (dataCallback && typeof dataCallback !== 'function') {
      throw new Error('dataCallback must be a function');
    }
    const URL = `${this.baseURL}/tasks/closed.json`;

    const response = await axios
      .get(URL, { headers: this.DEFAULT_HEADERS })
      .catch((error) => {
        throw new Error(error?.response?.data ?? error?.response ?? error);
      });

    return dataCallback ? dataCallback(response?.data) : response?.data;
  }
}

export default Tasks;
