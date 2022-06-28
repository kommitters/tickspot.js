import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/clients/updateClientFixture.js';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/clients/123456.json`;

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
      const response = await tickspot.clients.update(clientData);
      expect(response.name).toBe(clientData.name);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.clients.update(clientData);
    },
    URL,
    method: 'put',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.clients.update(clientData, {});
    },
    method: 'put',
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.clients.update(clientData, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    method: 'put',
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await tickspot.clients.update(requestParams);
    },
    URL,
    method: 'put',
    requestData: {},
    paramsList: ['clientId'],
  });
});
