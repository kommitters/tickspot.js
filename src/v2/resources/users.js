import BaseResource from '#src/v2/baseResource';
import listEntriesHelper from '#src/v2/helpers/listEntriesHelper';

/**
 * Users module for tickspot V2 API.
 */
class Users extends BaseResource {
  /**
   * This will return information about the users on the subscription.
   * Non-administrators will only have visibility of themselves,
   * while administrators will see everyone.
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   * @return {Array} list of all users.
   */
  async list(responseCallback) {
    const URL = `${this.baseURL}/users.json`;
    return this.makeRequest({
      URL, method: 'get', responseCallback,
    });
  }

  /**
   * This will return users who have been deleted from the subscription and have time entries.
   * Non-administrators will not have access.
   *
   * @param {callback} responseCallback
   *    is an optional function to perform a process over the response data.
   * @return {Array} list of all deleted users.
   */
  async listDeleted(responseCallback) {
    const URL = `${this.baseURL}/users/deleted.json`;
    return this.makeRequest({
      URL, method: 'get', responseCallback,
    });
  }

  /**
   * This method will return all time entries that are related to a user.
   *
   * @param {object} Filters contains the params to get the entries.
   *    [Required] startDate, Format is: 'YYYY-MM-DD'.
   *    [Required] endDate, Format is: 'YYYY-MM-DD'.
   *    [Required] userId, will be ignored if the user is not an administrator.
   *    [Optional] taskId, related parent task.
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
      module: 'users',
    });

    return this.makeRequest({
      URL, method: 'get', params, responseCallback,
    });
  }
}

export default Users;
