import axios from 'axios';
import { TOGGL_API_TOKEN, TOGGL_BASE_URL } from '#config';

const URL = `${TOGGL_BASE_URL}/time_entries`;

/**
 * Create Toggl Entries
 * @param {object} dataEntry is an object with the data entry. The following keys are required:
 * wid: workspace ID (integer, required if pid or tid not supplied)
 * start: time entry start time (string, required, ISO 8601 date and time)
 * duration: time entry duration in seconds.(integer, required)
 * created_with: the name of your client app (string, required)
 * For more information visit:
 * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#time-entries
 * @returns data entry confirmation.
 */
const createTogglEntries = async (dataEntry) => {
  const response = await axios.post(URL, { time_entry: dataEntry },
    { auth: { username: TOGGL_API_TOKEN, password: 'api_token' } })
    .catch((error) => error.response);

  return response.data;
};

export default createTogglEntries;
