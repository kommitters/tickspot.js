import axios from 'axios';
import TOKENS from 'toggltick-js/config';
import baseUrl from 'toggltick-js/src/clients/baseUrl';

const { TOGGL_API_TOKEN } = TOKENS;
const { TogglBaseURL } = baseUrl;
const URL = `${TogglBaseURL}/time_entries`;

export default async function getTogglEntries(startDate, endDate) {
  const response = await axios.get(URL, { auth: { username: TOGGL_API_TOKEN, password: 'api_token' }, params: { start_date: startDate, end_date: endDate } })
    .catch((error) => error.response);
  if (response?.data) return response.data;
  return [];
}
