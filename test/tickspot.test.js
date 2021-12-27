import tickspot from '#src/index';
import userInfo from '#test/v2/fixture/client';
import Client from '#src/v2/client';

describe('tickspot', () => {
  it('when the tickspot method returns the client', () => {
    const client = tickspot({ apiVersion: 2, ...userInfo });
    expect(client).toBeInstanceOf(Client);
  });

  it('when the api version is not available', () => {
    const client = tickspot({ apiVersion: 3, ...userInfo });
    expect(client).toEqual(Error('The version is not available'));
  });
});
