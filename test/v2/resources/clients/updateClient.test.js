import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import successfulResponseData from '#test/v2/fixture/clients/updateClientFixture.js';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/clients/123456.json`;

describe('#update', () => {
  const clientData = {
    clientId: 123456,
    name: 'Client #1',
    archive: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when API call is successful', () => {
    const requestResponse = responseFactory({
      requestData: clientData,
      responseType: 'successful',
      responseData: successfulResponseData,
      URL,
    });

    beforeEach(() => {
      axios.put.mockResolvedValueOnce(requestResponse);
    });

    it('should update the specific client', async () => {
      const response = await client.clients.update(clientData);
      expect(response.name).toBe(clientData.name);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.clients.update(clientData);
    },
    URL,
    method: 'put',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.clients.update(clientData, {});
    },
    method: 'put',
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.clients.update(clientData, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    method: 'put',
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await client.clients.update(requestParams);
    },
    URL,
    method: 'put',
    requestData: {},
    paramsList: ['clientId'],
  });
});
