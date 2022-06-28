import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/projects/getProjectFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/projects/16.json`;

describe('#get', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

    it('should return the project information', async () => {
      const response = await tickspot.projects.get('16');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        URL,
        { headers: tickspot.projects.DEFAULT_HEADERS },
      );

      expect(response).toEqual(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.projects.get('16');
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.projects.get('16', {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.projects.get('16', dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async () => {
      await tickspot.projects.get();
    },
    URL,
    paramsList: ['projectId'],
    positionalParam: true,
  });
});
