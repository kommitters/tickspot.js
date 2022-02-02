import BaseResource from '#src/v2/baseResource';

/**
 * Tasks module for tickspot V2 API.
 */
class Tasks extends BaseResource {
  /**
   * This method will return all closed tasks across all projects.
   *
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Array} a list of all the closed tasks.
   */
  async listClosed(responseCallback) {
    const URL = `${this.baseURL}/tasks/closed.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }
}

export default Tasks;
