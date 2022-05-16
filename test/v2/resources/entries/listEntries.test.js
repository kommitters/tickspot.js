import axios from 'axios';
import Tickspot from '#src/index';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/entries/listEntriesFixture';
import responseFactory from '#test/v2/factories/responseFactory';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/entries.json`;

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
      const response = await tickspot.entries.list(params);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        URL,
        {
          headers: tickspot.entries.DEFAULT_HEADERS,
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        },
      );
      expect(response).toEqual(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.entries.list(params);
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.entries.list(params, {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.entries.list(params, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await tickspot.entries.list(requestParams);
    },
    URL,
    requestData: params,
    paramsList: ['startDate', 'endDate'],
  });
});
