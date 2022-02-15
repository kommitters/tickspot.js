import BaseResource from '#src/v2/baseResource';
import listEntriesService from '../helpers/listEntries.helper';

/**
 * Tasks module for tickspot V2 API.
 */
class Tasks extends BaseResource {
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
