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
}

export default Tasks;
