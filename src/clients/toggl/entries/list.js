import axios from 'axios';
import TOKENS from '../../../../config.js';

const { TOGGL_API_TOKEN } = TOKENS;
const URL = 'https://api.track.toggl.com/api/v8/time_entries';

// eslint-disable-next-line camelcase
export default async function getTogglEntries(start_date, end_date) {
  try {
    const response = await axios.get(URL, { auth: { username: TOGGL_API_TOKEN, password: 'api_token' }, params: { start_date, end_date } });
    console.log(response.data); // eslint-disable-line no-console
    return response.data;
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return error;
  }
}
