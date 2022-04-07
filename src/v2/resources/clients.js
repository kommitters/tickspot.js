import BaseResource from '#src/v2/baseResource';

/**
 * Clients module for tickspot V2 API.
 */
class Clients extends BaseResource {
  /**
   * This method will return all the clients that have opened projects.
   * @param {Number} page, the first page returns
   *     up to 100 records and you can check the next page for more results
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   * @return {Array} list of all the clients that have opened projects.
   */
  async list(page, responseCallback) {
    if (!page) throw new Error('page field is missing');

    const URL = `${this.baseURL}/clients.json`;
    const params = { page };

    return this.makeRequest({
      URL, method: 'get', params, responseCallback,
    });
  }

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

  /**
   * This will will delete the client.
   * @param {Number} clientId, client unique identificator. Only clients without any
      projects can be deleted
   * @returns {Boolean} true if the cliente was deleted or an error if the process fails.
   */
  async delete(clientId) {
    if (!clientId) throw new Error('clientId field is missing');

    const URL = `${this.baseURL}/clients/${clientId}.json`;
    return this.makeRequest({ URL, method: 'delete' });
  }
}

export default Clients;
