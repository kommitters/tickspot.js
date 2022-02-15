import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import successfulResponseData from '#test/v2/fixture/tasks/openedTasksFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/tasks.json`;

describe('#listOpened', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  describe('when API call is successful', () => {
    const requestResponse = responseFactory({
      requestData: {},
      responseType: 'successful',
      responseData: successfulResponseData,
      URL,
    });

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(requestResponse);
    });

    it('should return a list with all opened tasks across all projects', async () => {
      const response = await client.tasks.listOpened();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.tasks.listOpened();
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.tasks.listOpened({});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.tasks.listOpened(dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });
});
