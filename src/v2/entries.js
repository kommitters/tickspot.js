import axios from 'axios';

/**
 * Entries module for tickspor v2 API
 * For more information visit:
 * https://github.com/tick/tick-api/blob/master/sections/entries.md
 */
export default class Entries {
  constructor({ auth, baseURL, agentEmail }) {
    this.baseURL = baseURL;
    this.DEFAULT_HEADERS = {
      Authorization: auth,
      'User-Agent':
      `tickspot.js (${agentEmail})`,
    };
  }

  /**
 * Create Tick Entries
 * @param {object} {} is an object with the data entry. The following are the object keys:
 * date
 * hours: required*
 * notes
 * task_id: required*
 * user_id: will be ignored if the user is not an administrator
 * @param {callback} dataCallback is an optional callback to handle the output data.
 * @returns data entry confirmation or an error is a required field is missing.
 */
  async create({
    date,
    hours,
    notes,
    taskId,
    userId,
  }, dataCallback) {
    if (!hours) throw new Error('hours field is missing');
    if (!taskId) throw new Error('taskId field is missing');

    const dataEntry = {
      date,
      hours,
      notes,
      task_id: taskId,
      user_id: userId,
    };
    const URL = `${this.baseURL}/entries.json`;

    const response = await axios.post(
      URL,
      dataEntry,
      { headers: this.DEFAULT_HEADERS },
    )
      .then(({ data }) => (dataCallback ? dataCallback(data) : data))
      .catch((error) => {
        throw new Error(error?.response?.data ?? error?.response ?? error);
      });

    return response;
  }

  /**
 * List Tick Entries
 * @param {object} {} is an object with the params to get the entries.
 * The following are the object keys:
 * startDate: required*
 * endDate: required*
 * user_id: will be ignored if the user is not an administrator
 * @param {callback} dataCallback is an optional callback to handle the output data.
 * @returns array with the list entries or an error is a required field is missing.
 */
  async list({
    startDate,
    endDate,
    userId,
  }, dataCallback) {
    if (!startDate) throw new Error('startDate field is missing');
    if (!endDate) throw new Error('endDate field is missing');

    const params = {
      start_date: startDate,
      end_date: endDate,
      user_id: userId,
    };
    const URL = `${this.baseURL}/entries.json`;

    const response = await axios.get(
      URL,
      { headers: this.DEFAULT_HEADERS, params },
    )
      .then(({ data }) => (dataCallback ? dataCallback(data) : data))
      .catch((error) => {
        throw new Error(error?.response?.data ?? error?.response ?? error);
      });

    return response;
  }
}
