import axios from 'axios';
import API_TOKEN from '../config.js';

const apiTokenBase64 = Buffer.from(`${API_TOKEN}:api_token`).toString('base64');
export default function togglAuth() {
  axios
    .get('https://api.track.toggl.com/api/v8/me', { headers: { Authorization: `Basic ${apiTokenBase64}` } })
    .then((res) => {
      const json = res.data;
      console.log(json); // eslint-disable-line no-console
    })
    .catch((err) => {
      const message = err.response.statusText || 'Ocurrió un error';
      console.log(message); // eslint-disable-line no-console
    })
    .finally(() => {
    });
}
