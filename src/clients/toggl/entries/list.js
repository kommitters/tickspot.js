import axios from 'axios';
import { TOGGL_API_TOKEN, TOGGL_BASE_URL } from '#config';

const URL = `${TOGGL_BASE_URL}/time_entries`;

/**
 * Get the entries from Toggl in an specific time range.
 * @param {string} startDate date in ISO8601 format
 * @param {string} endDate date in ISO8601 format
 * @returns an array with the entries in the selected time range
 */
const getTogglEntries = async (startDate, endDate) => {
  const response = await axios.get(URL, {
    auth: { username: TOGGL_API_TOKEN, password: 'api_token' },
    params: { start_date: startDate, end_date: endDate },
  })
    .catch((error) => error.response);

  return response.data;
};

export default getTogglEntries;
