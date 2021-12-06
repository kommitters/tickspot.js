import axios from 'axios';
import TICK_BASE_URL_START from '#config';

/**
 * Entries module for tickspor v2 API
 * For more information visit:
 * https://github.com/tick/tick-api/blob/master/sections/entries.md
 */
export default class Entries {
  constructor({ subscriptionId, apiToken }) {
    this.baseURL = `${TICK_BASE_URL_START}/${subscriptionId}/api/v2`;
    this.auth = `Token token=${apiToken}`;
    this.USER_AGENT_EMAIL = 'user@kommit.co';
  }

  /**
 * Create Toggl Entries
 * @param {object} {} is an object with the data entry. The following are the object keys:
 * date
 * hours: required*
 * notes
 * task_id: required*
 * user_id: will be ignored if the user is not an administrator
 * @returns data entry confirmation.
 */
  async create({
    date,
    hours,
    notes,
    taskId,
    userId,
  }) {
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

    return response.data;
  }
}
