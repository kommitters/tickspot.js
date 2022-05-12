import axios from 'axios';
import tickspot from '#src/index';
import userInfo from '#test/v2/fixture/client';
import successfulResponseData from '#test/v2/fixture/entries/listEntriesFixture';
import responseFactory from '#test/v2/factories/responseFactory';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/entries.json`;

describe('#list', () => {
  const params = {
    startDate: '2021-11-08',
    endDate: '2021-11-09',
    userId: 'userId',
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

    it('should return the list of tick entries', async () => {
      const response = await client.entries.list(params);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        URL,
        {
          headers: client.entries.DEFAULT_HEADERS,
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        },
      );
      expect(response).toEqual(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.entries.list(params);
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.entries.list(params, {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.entries.list(params, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await client.entries.list(requestParams);
    },
    URL,
    requestData: params,
    paramsList: ['startDate', 'endDate'],
  });
});
