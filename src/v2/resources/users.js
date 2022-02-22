import BaseResource from '#src/v2/baseResource';

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
}

export default Users;
