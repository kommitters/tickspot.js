import axios from 'axios';
import API_TOKEN from '../config.js';

export const URL = 'https://api.track.toggl.com/api/v8/me';
const apiTokenBase64 = Buffer.from(`${API_TOKEN}:api_token`).toString('base64');

export function togglAuth() {
  return axios
    .get(URL, { headers: { Authorization: `Basic ${apiTokenBase64}` } })
    .then((res) => {
      console.log(res); // eslint-disable-line no-console
      return res.data;
    })
    .catch((err) => {
      console.log(err.response); // eslint-disable-line no-console
      return err.response;
    })
    .finally(() => {
    });
}
