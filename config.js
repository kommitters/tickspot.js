import dotenv from 'dotenv';

dotenv.config();

export const {
  TOGGL_API_TOKEN,
  TOGGL_BASE_URL,
  TICKSPOT_BASE_URL,
  TICKSPOT_API_TOKEN,
  TICKSPOT_SUBSCRIPTION_ID,
  USER_AGENT_EMAIL,
} = process.env;
