import tickspot from '#src/index';
import userInfo from '#test/v2/fixture/client';

describe('client', () => {
  it('when the client instance is created successfully', () => {
    const client = tickspot({ apiVersion: 2, ...userInfo });
    const auth = `Token token=${userInfo.apiToken}`;
    expect(client.auth).toBe(auth);
  });

  it('when the subscriptionId field is missing', () => {
    const userInfoMissed = { ...userInfo, subscriptionId: null };
    const tickspotFailed = () => tickspot({ apiVersion: 2, ...userInfoMissed });
    expect(tickspotFailed).toThrowError('subscriptionId is missing');
  });

  it('when the apiToken field is missing', () => {
    const userInfoMissed = { ...userInfo, apiToken: null };
    const tickspotFailed = () => tickspot({ apiVersion: 2, ...userInfoMissed });
    expect(tickspotFailed).toThrowError('apiToken is missing');
  });

  it('when the agentEmail field is missing', () => {
    const userInfoMissed = { ...userInfo, agentEmail: null };
    const tickspotFailed = () => tickspot({ apiVersion: 2, ...userInfoMissed });
    expect(tickspotFailed).toThrowError('agentEmail is missing');
  });
});
