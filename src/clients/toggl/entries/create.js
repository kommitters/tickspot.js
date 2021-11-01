import axios from 'axios';
import { TOGGL_API_TOKEN, TOGGL_BASE_URL } from '#config';

const URL = `${TOGGL_BASE_URL}/time_entries`;

const createTogglEntries = async (dataEntry) => {
  const response = await axios.post(URL, { time_entry: dataEntry },
    { auth: { username: TOGGL_API_TOKEN, password: 'api_token' } })
    .catch((error) => error.response);

  if (response?.data) return response.data;

  return [];
};

export default createTogglEntries;
