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
  async get(clientId, responseCallback) {
    if (!clientId) throw new Error('clientId field is missing');

    const URL = `${this.baseURL}/clients/${clientId}.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }

  /**
   * This method will create a new client, it is strictly limited to administrators.
   * @param {object} Client contains the params to create the client.
   *    [Required] name
   *    [Optional] archive

   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Object} a object with created client data.
   */
  async create({
    name,
    archive,
  }, responseCallback) {
    if (!name) throw new Error('name field is missing');

    const body = {
      name,
      ...(typeof archive === 'boolean' && { archive }),
    };

    const URL = `${this.baseURL}/clients.json`;
    return this.makeRequest({
      URL, method: 'post', body, responseCallback,
    });
  }

  /**
   * This will update the client from the parameters passed.
   * @param {object} Client contains the params to update the client.
   *    [Required] clientId, client unique identificator.
   *    [Optional] name
   *    [Optional] archive
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} client info or an error if the process fails.
   */
  async update({
    clientId,
    name,
    archive,
  }, responseCallback) {
    if (!clientId) throw new Error('clientId field is missing');

    const body = {
      ...(name && { name }),
      ...(typeof archive === 'boolean' && { archive }),
    };

    const URL = `${this.baseURL}/clients/${clientId}.json`;

    return this.makeRequest({
      URL, method: 'put', body, responseCallback,
    });
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
