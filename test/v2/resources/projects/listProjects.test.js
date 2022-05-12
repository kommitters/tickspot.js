import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import successfulResponseData from '#test/v2/fixture/projects/listProjectsFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });

const methods = ['listOpened', 'listClosed'];

const getUrl = (method) => (method === 'listOpened'
  ? `${client.baseURL}/projects.json`
  : `${client.baseURL}/projects/closed.json`);

describe.each(methods)('#%s', (method) => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  const URL = getUrl(method);

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

    it('should return a list of projects', async () => {
      const response = await client.projects[`${method}`](1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.projects[`${method}`](1);
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.projects[`${method}`](1, {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.projects[`${method}`](1, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async () => {
      await client.projects[`${method}`]();
    },
    URL,
    paramsList: ['page'],
    positionalParam: true,
  });
});
