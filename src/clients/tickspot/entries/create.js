import axios from 'axios';
import {
  TICKSPOT_BASE_URL,
  TICKSPOT_API_TOKEN,
  TICKSPOT_SUBSCRIPTION_ID,
  USER_AGENT_EMAIL,
} from '#config';

const URL = `${TICKSPOT_BASE_URL}/${TICKSPOT_SUBSCRIPTION_ID}/api/v2/entries.json`;
const auth = `Token token=${TICKSPOT_API_TOKEN}`;

/**
 * Create Toggl Entries
 * @param {object} dataEntry is an object with the data entry. The following are the object keys:
 * date
 * hours: required*
 * notes
 * task_id: required*
 * user_id: will be ignored if the user is not an administrator
 * For more information visit:
 * https://github.com/tick/tick-api/blob/master/sections/entries.md#create-entry
 * @param {string} userAgentEmail is the application email
 * @returns data entry confirmation.
 */
const createTickEntries = async (dataEntry, userAgentEmail = USER_AGENT_EMAIL) => {
  const response = await axios.post(URL, { ...dataEntry },
    { headers: { Authorization: auth, 'User-Agent': `Toggltickjs (${userAgentEmail})` } })
    .catch((error) => error.response);

  return response.data;
};

export default createTickEntries;
