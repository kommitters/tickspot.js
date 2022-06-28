import Tickspot from '#src/index';
import credentials from '#test/v2/fixture/credentials';

describe('client', () => {
  it('when the client instance is created successfully', () => {
    const client = Tickspot.init({ apiVersion: 2, ...credentials });
    const auth = `Token token=${credentials.apiToken}`;
    expect(client.auth).toBe(auth);
  });

  it('when the subscriptionId field is missing', () => {
    const missingCredentials = { ...credentials, subscriptionId: null };
    const tickspotFailed = () => Tickspot.init({ apiVersion: 2, ...missingCredentials });
    expect(tickspotFailed).toThrowError('subscriptionId is missing');
  });

  it('when the apiToken field is missing', () => {
    const missingCredentials = { ...credentials, apiToken: null };
    const tickspotFailed = () => Tickspot.init({ apiVersion: 2, ...missingCredentials });
    expect(tickspotFailed).toThrowError('apiToken is missing');
  });

  it('when the agentEmail field is missing', () => {
    const missingCredentials = { ...credentials, agentEmail: null };
    const tickspotFailed = () => Tickspot.init({ apiVersion: 2, ...missingCredentials });
    expect(tickspotFailed).toThrowError('agentEmail is missing');
  });
});
