import TICK_BASE_URL_START from './constants.js';
import Entries from './resources/entries.js';
import Tasks from './resources/tasks.js';
import Projects from './resources/projects.js';

/**
 * Client module for tickspor v2 API, it is the main class.
 */
export default class Client {
  constructor({ subscriptionId, apiToken, agentEmail }) {
    if (!subscriptionId) throw new Error('subscriptionId is missing');
    if (!apiToken) throw new Error('apiToken is missing');
    if (!agentEmail) throw new Error('agentEmail is missing');

    this.baseURL = `${TICK_BASE_URL_START}/${subscriptionId}/api/v2`;
    this.auth = `Token token=${apiToken}`;

    this.entries = new Entries({ auth: this.auth, baseURL: this.baseURL, agentEmail });
    this.tasks = new Tasks({ auth: this.auth, baseURL: this.baseURL, agentEmail });
    this.projects = new Projects({ auth: this.auth, baseURL: this.baseURL, agentEmail });
  }
}
