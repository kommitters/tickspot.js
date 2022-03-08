import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import successfulResponseData from '#test/v2/fixture/projects/getProjectFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/projects/16.json`;

describe('getProject', () => {
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
      const response = await client.projects.getProject('16');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        URL,
        { headers: client.projects.DEFAULT_HEADERS },
      );

      expect(response).toEqual(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.projects.getProject('16');
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.projects.getProject('16', {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.projects.getProject('16', dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async () => {
      await client.projects.getProject();
    },
    URL,
    paramsList: ['projectId'],
    positionalParam: true,
  });
});
