import dotenv from 'dotenv';

dotenv.config();
const { TOGGL_API_TOKEN, TOGGL_BASE_URL } = process.env;

export { TOGGL_API_TOKEN, TOGGL_BASE_URL };
