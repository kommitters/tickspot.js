import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/clients/createClientFixture.js';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/clients.json`;

describe('#create', () => {
  const clientData = {
    name: 'Test',
    archive: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when API call is successful', () => {
    const requestResponse = responseFactory({
      requestData: clientData,
      responseType: 'created',
      responseData: successfulResponseData,
      URL,
    });

    beforeEach(() => {
      axios.post.mockResolvedValueOnce(requestResponse);
    });

    it('should create the new client', async () => {
      const response = await tickspot.clients.create(clientData);
      expect(response.data.name).toBe(clientData.name);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.clients.create(clientData);
    },
    URL,
    method: 'post',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.clients.create(clientData, {});
    },
    method: 'post',
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.clients.create(clientData, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    method: 'post',
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await tickspot.clients.create(requestParams);
    },
    URL,
    method: 'post',
    requestData: clientData,
    paramsList: ['name'],
  });
});
