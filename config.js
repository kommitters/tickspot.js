import dotenv from 'dotenv';

dotenv.config();
const { TOGGL_API_TOKEN } = process.env;
const { TICKSPOT_API_TOKEN } = process.env;

export default { TOGGL_API_TOKEN, TICKSPOT_API_TOKEN };
