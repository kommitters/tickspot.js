import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/entries/listEntriesFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/tasks/123/entries.json`;

describe('#listEntries', () => {
  const params = {
    startDate: '2021-11-08',
    endDate: '2021-11-09',
    userId: 'userId',
    taskId: 123,
  };

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

    it('should return a list with all entries related to a task', async () => {
      const response = await tickspot.tasks.listEntries(params);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.tasks.listEntries(params);
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.tasks.listEntries(params, {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.tasks.listEntries(params, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await tickspot.tasks.listEntries(requestParams);
    },
    URL,
    requestData: params,
    paramsList: ['startDate', 'endDate', 'taskId'],
  });
});
