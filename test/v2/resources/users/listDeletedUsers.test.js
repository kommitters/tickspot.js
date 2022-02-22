import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import listDeletedUsersFixture from '#test/v2/fixture/users/listDeletedUsersFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/users/deleted.json`;

describe('#listDeleted', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  describe('when API call is successful', () => {
    const requestResponse = responseFactory({
      requestData: {},
      responseType: 'successful',
      responseData: listDeletedUsersFixture,
      URL,
    });

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(requestResponse);
    });

    it('should return a list with all deleted users', async () => {
      const response = await client.users.listDeleted();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.users.listDeleted();
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.users.listDeleted({});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.users.listDeleted(dataCallback);
      return [response, dataCallback];
    },
    responseData: listDeletedUsersFixture,
    URL,
  });
});
