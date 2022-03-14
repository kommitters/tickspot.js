import BaseResource from '#src/v2/baseResource';
import listEntriesHelper from '#src/v2/helpers/listEntriesHelper';

/**
 * Projects module for tickspot V2 API.
 */
class Projects extends BaseResource {
  /**
   * This method will create a new project, it is strictly limited to administrators,
   * no tasks will be created, time entries will not be allowed until at least one
   * task is created.
   * @param {object} Task contains the params to create the task.
   *    [Required] name
   *    [Required] client_id
   *    [Required] owner_id
   *    [Optional] budget
   *    [Optional] notifications
   *    [Optional] billable
   *    [Optional] recurring

   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Object} a object with created project data.
   */
  async create({
    name,
    clientId,
    ownerId,
    budget,
    notifications,
    billable,
    recurring,
  }, responseCallback) {
    if (!name) throw new Error('name field is missing');
    if (!clientId) throw new Error('clientId field is missing');
    if (!ownerId) throw new Error('ownerId field is missing');

    const body = {
      name,
      budget,
      ...(clientId && { client_id: clientId }),
      ...(ownerId && { owner_id: ownerId }),
      ...(typeof notifications === 'boolean' && { notifications }),
      ...(typeof billable === 'boolean' && { billable }),
      ...(typeof recurring === 'boolean' && { recurring }),
    };

    const URL = `${this.baseURL}/projects.json`;
    return this.makeRequest({
      URL, method: 'post', body, responseCallback,
    });
  }

  /**
   * This will update the project from the parameters passed.
   * @param {object} Task contains the params to update the task.
   *    [Required] projectId, project unique identificator.
   *    [Optional] name
   *    [Optional] client_id
   *    [Optional] owner_id
   *    [Optional] budget
   *    [Optional] notifications
   *    [Optional] billable
   *    [Optional] recurring
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} project info or an error if the process fails.
   */
  async updateProject({
    projectId,
    name,
    clientId,
    ownerId,
    budget,
    notifications,
    billable,
    recurring,
  }, responseCallback) {
    if (!projectId) throw new Error('projectId field is missing');

    const body = {
      ...(name && { name }),
      ...(budget && { budget }),
      ...(clientId && { client_id: clientId }),
      ...(ownerId && { owner_id: ownerId }),
      ...(typeof notifications === 'boolean' && { notifications }),
      ...(typeof billable === 'boolean' && { billable }),
      ...(typeof recurring === 'boolean' && { recurring }),
    };

    const URL = `${this.baseURL}/projects/${projectId}.json`;

    return this.makeRequest({
      URL, method: 'put', body, responseCallback,
    });
  }

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
   * @returns {object} project info or an error if the process fails.
   */
  async getProject(projectId, responseCallback) {
    if (!projectId) throw new Error('projectId field is missing');

    const URL = `${this.baseURL}/projects/${projectId}.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }
}

export default Projects;
