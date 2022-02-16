import BaseResource from '#src/v2/baseResource';
import listEntriesService from '../helpers/listEntries.helper';

/**
 * Tasks module for tickspot V2 API.
 */
class Tasks extends BaseResource {
  /**
   * This method will create a new task, it is strictly limited to administrators.
   *
   * @param {object} Task contains the params to create the task.
   *    [Required] name
   *    [Required] projectId
   *    [Optional] budget
   *    [Optional] billable
   *    [Optional] dateClosed
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Object} a object with created task data.
   */
  async create({
    budget,
    billable,
    name,
    projectId,
    dateClosed,
  }, responseCallback) {
    if (!name) throw new Error('name field is missing');
    if (!projectId) throw new Error('projectId field is missing');

    const body = {
      budget,
      ...(typeof billable === 'boolean' && { billable }),
      ...(name && { name }),
      ...(projectId && { project_id: projectId }),
      ...(dateClosed && { date_closed: dateClosed }),
    };

    const URL = `${this.baseURL}/tasks.json`;
    return this.makeRequest({
      URL, method: 'post', body, responseCallback,
    });
  }

  /**
   * This method will return the specified task.
   * @param {Number} taskId, task unique identificator.
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} task data on tickspot or an error if the process fails.
   */
  async getTask(taskId, responseCallback) {
    if (!taskId) throw new Error('taskId field is missing');

    const URL = `${this.baseURL}/tasks/${taskId}.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }

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

  /**
   * This method will update a specified task, it is strictly limited to administrators.
   *
   * @param {object} Task contains the params to update the task.
   *    [Required] taskId
   *    [Required] budget
   *    [Optional] billable
   *    [Optional] name
   *    [Optional] position
   *    [Optional] projectId
   *    [Optional] dateClosed
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Object} a object with updated task data.
   */
  async update({
    taskId,
    budget,
    billable,
    name,
    position,
    projectId,
    dateClosed,
  }, responseCallback) {
    if (!taskId) throw new Error('taskId field is missing');
    if (budget === undefined) throw new Error('budget field cannot be undefined');

    const body = {
      budget,
      ...(typeof billable === 'boolean' && { billable }),
      ...(name && { name }),
      ...(position && { position }),
      ...(projectId && { project_id: projectId }),
      ...(dateClosed && { date_closed: dateClosed }),
    };

    const URL = `${this.baseURL}/tasks/${taskId}.json`;
    return this.makeRequest({
      URL, method: 'put', body, responseCallback,
    });
  }

  /**
   * This method will return all opened tasks across all projects.
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @return {Array} list of all opened tasks across all projects.
   */
  async listOpened(responseCallback) {
    const URL = `${this.baseURL}/tasks.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }

  /**
   * This method will return all time entries that are related to the task
   *
   * @param {object} Filters contains the params to get the entries.
   *    [Optional] taskId, related parent task.
   *    [Required] startDate, Format is: 'YYYY-MM-DD'.
   *    [Required] endDate, Format is: 'YYYY-MM-DD'.
   *    [Optional] userId, will be ignored if the user is not an administrator.
   *    [Optional] billable
   *    [Optional] billed
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} array with the list of entries or an error if the process fails.
   */
  async listEntries({
    taskId,
    startDate,
    endDate,
    userId,
    projectId,
    billable,
    billed,
  }, responseCallback) {
    const { URL, params } = listEntriesService({
      startDate,
      endDate,
      userId,
      projectId,
      taskId,
      billable,
      billed,
    }, {
      baseURL: this.baseURL,
      module: 'tasks',
    });

    return this.makeRequest({
      URL, method: 'get', params, responseCallback,
    });
  }
}

export default Tasks;
