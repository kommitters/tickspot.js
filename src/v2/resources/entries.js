import BaseResource from '#src/v2/baseResource';
import listEntriesService from '../helpers/listEntries.helper';

/**
 * Entries module for tickspot V2 API.
 * For more information visit:
 * https://github.com/tick/tick-api/blob/master/sections/entries.md
 */
class Entries extends BaseResource {
  /**
   * This will return all time entries that meet the provided parameters.
   * @param {object} Filters contains the params to get the entries.
   *    [Required] startDate, Format is: 'YYYY-MM-DD'.
   *    [Required] endDate, Format is: 'YYYY-MM-DD'.
   *    [Optional] userId, will be ignored if the user is not an administrator.
   *    [Optional] taskId, related parent task.
   *    [Optional] billable
   *    [Optional] billed
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} array with the list of entries or an error if the process fails.
   */
  async list({
    startDate,
    endDate,
    userId,
    projectId,
    taskId,
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
    }, { baseURL: this.baseURL });

    return this.makeRequest({
      URL, method: 'get', params, responseCallback,
    });
  }

  /**
   * This will return specific entry info.
   * @param {Number} entryId, entry unique identificator.
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} entry info or an error if the process fails.
   */
  async getEntry(entryId, responseCallback) {
    if (!entryId) throw new Error('entryId field is missing');

    const URL = `${this.baseURL}/entries/${entryId}.json`;
    return this.makeRequest({ URL, method: 'get', responseCallback });
  }

  /**
   * This will create a new entry from the parameters passed.
   * @param {object} Entry contains the fields to send in the body request.
   *    [Optional] date, if not sent it will take the current date. Format is: 'YYYY-MM-DD'.
   *    [Required] hours, time spent on this entry.
   *    [Optional] notes, entry description.
   *    [Required] taskId, related parent task.
   *    [Optional] userId, will be ignored if the user is not an administrator.
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} entry data created on tickspot or an error if the process fails.
   */
  async create({
    date,
    hours,
    notes,
    taskId,
    userId,
  }, responseCallback) {
    if (!hours) return new Error('hours field is missing');
    if (!taskId) return new Error('taskId field is missing');

    const body = {
      hours,
      task_id: taskId,
      ...(date && { date }),
      ...(notes && { notes }),
      ...(userId && { user_id: userId }),
    };

    const URL = `${this.baseURL}/entries.json`;
    return this.makeRequest({
      URL, method: 'post', body, responseCallback,
    });
  }

  /**
   * This will update the entry from the parameters passed.
   * @param {object} Entry contains the fields to send in the body request.
   *    [Required] entryId, entry unique identificator.
   *    [Optional] date, if not sent it will take the current date. Format is: 'YYYY-MM-DD'.
   *    [Optional] hours, time spent on this entry.
   *    [Optional] notes, entry description.
   *    [Optional] taskId, related parent task.
   *    [Optional] userId, will be ignored if the user is not an administrator.
   *    [Optional] billed
   * @param {function} responseCallback
   *    is an optional function to perform a process over the response data.
   *
   * @returns {object} entry info or an error if the process fails.
   */
  async updateEntry({
    entryId,
    date,
    hours,
    notes,
    taskId,
    userId,
    billed,
  }, responseCallback) {
    if (!entryId) throw new Error('entryId field is missing');

    const body = {
      ...(date && { date }),
      ...(hours && { hours }),
      ...(notes && { notes }),
      ...(taskId && { task_id: taskId }),
      ...(userId && { user_id: userId }),
      ...(typeof billed === 'boolean' && { billed }),
    };

    const URL = `${this.baseURL}/entries/${entryId}.json`;
    return this.makeRequest({
      URL, method: 'put', body, responseCallback,
    });
  }

  /**
   * This will delete the entry.
   * @param {Number} entryId, entry unique identificator.
   *
   * @returns {Boolean} true if entry was deleted or an error if the process fails.
   */
  async deleteEntry(entryId) {
    if (!entryId) throw new Error('entryId field is missing');

    const URL = `${this.baseURL}/entries/${entryId}.json`;
    return this.makeRequest({ URL, method: 'delete' });
  }
}

export default Entries;
