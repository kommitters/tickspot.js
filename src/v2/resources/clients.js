import BaseResource from '#src/v2/baseResource';

/**
 * Clients module for tickspot V2 API.
 */
class Clients extends BaseResource {
  /**
   * This will return the specified client along with a summary of project information.
   * @param {Number} clientId, client unique identificator.
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} client info or an error if the process fails.
   */
  async getClient(clientId, responseCallback) {
    if (!clientId) throw new Error('clientId field is missing');

    const URL = `${this.baseURL}/clients/${clientId}.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }
}

export default Clients;
