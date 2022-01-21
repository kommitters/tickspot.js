import axios from 'axios';

/**
 * Entries module for tickspor v2 API
 * For more information visit:
 * https://github.com/tick/tick-api/blob/master/sections/entries.md
 */
export default class Entries {
  constructor({ auth, baseURL, agentEmail }) {
    this.baseURL = baseURL;
    this.auth = auth;
    this.USER_AGENT_EMAIL = agentEmail;
  }

  /**
 * Create Toggl Entries
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
    if (!hours) return new Error('hours field is missing');
    if (!taskId) return new Error('taskId field is missing');

    const dataEntry = {
      date,
      hours,
      notes,
      task_id: taskId,
      user_id: userId,
    };
    const URL = `${this.baseURL}/entries.json`;

    const response = await axios.post(URL, dataEntry,
      {
        headers:
        { Authorization: this.auth, 'User-Agent': `Toggltickjs (${this.USER_AGENT_EMAIL})` },
      })
      .catch((error) => error.response);

    return dataCallback ? dataCallback(response.data) : response.data;
  }

  /**
 * Get a entry information
 * @param entryId
 * entryId: required*
 * @param {callback} dataCallback is an optional callback to handle the output data.
 * @returns data entry or an error is a required field is missing.
 */
  async getEntry(entryId, dataCallback) {
    if (!entryId) throw new Error('entryId field is missing');

    const URL = `${this.baseURL}/entries/${entryId}.json`;

    const response = await axios.get(URL,
      {
        headers:
        { Authorization: this.auth, 'User-Agent': `tickspot.js (${this.USER_AGENT_EMAIL})` },
      })
      .catch((error) => { throw new Error(`Request Error: ${error.response.status}`); });

    return dataCallback ? dataCallback(response.data) : response.data;
  }

  /**
 * Update entry information
 * @param {object} {} is an object with the data entry. The following are the object keys:
 * entryId: required*
 * date: it does not allow update to future dates
 * hours
 * notes
 * taskId
 * user_id: it will be ignored if the user is not an administrator
 * billed: if it is true, the entry will be blocked
 * @param {callback} dataCallback is an optional callback to handle the output data.
 * @returns data entry or an error is a required field is missing.
 */
  async updateEntry({
    entryId,
    date,
    hours,
    notes,
    taskId,
    userId,
    billed,
  }, dataCallback) {
    if (!entryId) throw new Error('entryId field is missing');

    const dataEntry = {
      date,
      hours,
      notes,
      task_id: taskId,
      user_id: userId,
      billed,
    };

    const URL = `${this.baseURL}/entries/${entryId}.json`;

    const response = await axios.put(URL, dataEntry,
      {
        headers:
        { Authorization: this.auth, 'User-Agent': `tickspot.js (${this.USER_AGENT_EMAIL})` },
      })
      .catch((error) => { throw new Error(`Request Error: ${error.response.status}`); });

    return dataCallback ? dataCallback(response.data) : response.data;
  }
}
