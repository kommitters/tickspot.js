import BaseResource from '#src/v2/baseResource';
import listEntriesHelper from '#src/v2/helpers/listEntriesHelper';

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

  /**
   * This method will return all time entries that are related to a project.
   *
   * @param {object} Filters contains the params to get the entries.
   *    [Required] startDate, Format is: 'YYYY-MM-DD'.
   *    [Required] endDate, Format is: 'YYYY-MM-DD'.
   *    [Required] projectId, related parent project.
   *    [Optional] userId, will be ignored if the user is not an administrator.
   *    [Optional] taskId, related parent task.
   *    [Optional] billable
   *    [Optional] billed
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} array with the list of entries or an error if the process fails.
   */
  async listEntries({
    startDate,
    endDate,
    projectId,
    userId,
    taskId,
    billable,
    billed,
  }, responseCallback) {
    const { URL, params } = listEntriesHelper({
      startDate,
      endDate,
      userId,
      projectId,
      taskId,
      billable,
      billed,
    }, {
      baseURL: this.baseURL,
      module: 'projects',
    });

    return this.makeRequest({
      URL, method: 'get', params, responseCallback,
    });
  }

  /**
   * This method will return all closed projects.
   * @param {Number} page, the first page returns
   *     up to 100 records and you can check the next page for more results
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Array} a list of all the closed projects.
   */
  async listClosed(page, responseCallback) {
    if (!page) throw new Error('page field is missing');

    const URL = `${this.baseURL}/projects/closed.json`;
    const params = { page };

    return this.makeRequest({
      URL, method: 'get', params, responseCallback,
    });
  }

  /**
   * This will return specific project info.
   * @param {Number} projectId, project unique identificator.
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} entry info or an error if the process fails.
   */
  async getProject(projectId, responseCallback) {
    if (!projectId) throw new Error('projectId field is missing');

    const URL = `${this.baseURL}/projects/${projectId}.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }
}

export default Projects;
