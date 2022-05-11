import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import { noContentResponse } from '#test/v2/fixture/shared/errorResponses';
import authenticationErrorTests from '#test/v2/shared/authentication';
import notFoundTests from '#test/v2/shared/notFound';
import wrongParamsTests from '#test/v2/shared/wrongParams';
import notAcceptableTest from '#test/v2/shared/notAcceptable';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/clients/123456.json`;

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
      const response = await client.clients.delete(123456);

      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(response).toEqual(true);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.clients.delete(123456);
    },
    URL,
    method: 'delete',
  });

  notFoundTests({
    requestToExecute: async () => {
      await client.clients.delete(654321);
    },
    URL,
    method: 'delete',
  });

  wrongParamsTests({
    requestToExecute: async () => {
      await client.clients.delete();
    },
    URL,
    paramsList: ['clientId'],
    positionalParam: true,
  });

  notAcceptableTest({
    requestToExecute: async () => {
      await client.clients.delete(123456);
    },
    URL,
    method: 'delete',
  });
});
