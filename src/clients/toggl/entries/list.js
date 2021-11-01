import axios from 'axios';
import { TOGGL_API_TOKEN, TOGGL_BASE_URL } from '#config';

const URL = `${TOGGL_BASE_URL}/time_entries`;

const getTogglEntries = async (startDate, endDate) => {
  const response = await axios.get(URL, {
    auth: { username: TOGGL_API_TOKEN, password: 'api_token' },
    params: { start_date: startDate, end_date: endDate },
  })
    .catch((error) => error.response);

  if (response?.data) return response.data;

  return [];
};

export default getTogglEntries;
