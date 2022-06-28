import Tickspot from '#src/index';
import credentials from '#test/v2/fixture/credentials';
import Client from '#src/v2/client';

describe('Tickspot.init', () => {
  it('when the tickspot method returns the client', () => {
    const client = Tickspot.init({ apiVersion: 2, ...credentials });
    expect(client).toBeInstanceOf(Client);
  });

  it('when the api version is not available', () => {
    const client = Tickspot.init({ apiVersion: 3, ...credentials });
    expect(client).toEqual(Error('The version is not available'));
  });
});
