import BaseResource from '#src/v2/baseResource';

/**
 * Projects module for tickspot V2 API.
 */

class Projects extends BaseResource {
  /**
   * This method will return all opened projects.
   * @param {Number} page, the first page returns
   *     up to 100 records and you can check the next page for more results
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   * @return {Array} list of all opened projects.
   */
  async listOpened(page, responseCallback) {
    if (!page) throw new Error('page field is missing');

    const URL = `${this.baseURL}/projects.json`;
    const params = { page };

    return this.makeRequest({
      URL, method: 'get', params, responseCallback,
    });
  }
}

export default Projects;
