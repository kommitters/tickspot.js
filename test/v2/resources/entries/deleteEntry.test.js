import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import { noContentResponse } from '#test/v2/fixture/shared/errorResponses';
import authenticationErrorTests from '#test/v2/shared/authentication';
import notFoundTests from '#test/v2/shared/notFound';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/entries/123456.json`;

describe('#delete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when API call is successful', () => {
    const requestResponse = responseFactory({
      requestData: {},
      responseType: 'successfulNoContent',
      responseData: noContentResponse,
      URL,
    });

    beforeEach(() => {
      axios.delete.mockResolvedValueOnce(requestResponse);
    });

    it('should return true', async () => {
      const response = await tickspot.entries.delete('123456');

      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith(
        URL,
        { headers: tickspot.entries.DEFAULT_HEADERS },
      );

      expect(response).toEqual(true);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.entries.delete('123456');
    },
    URL,
    method: 'delete',
  });

  notFoundTests({
    requestToExecute: async () => {
      await tickspot.entries.delete('654321');
    },
    URL,
    method: 'delete',
  });

  wrongParamsTests({
    requestToExecute: async () => {
      await tickspot.entries.delete();
    },
    URL,
    paramsList: ['entryId'],
    positionalParam: true,
  });
});
