import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/projects/listProjectsFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });

const methods = ['listOpened', 'listClosed'];

const getUrl = (method) => (method === 'listOpened'
  ? `${tickspot.baseURL}/projects.json`
  : `${tickspot.baseURL}/projects/closed.json`);

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
      const response = await tickspot.projects[`${method}`](1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.projects[`${method}`](1);
    },
    URL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.projects[`${method}`](1, {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.projects[`${method}`](1, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async () => {
      await tickspot.projects[`${method}`]();
    },
    URL,
    paramsList: ['page'],
    positionalParam: true,
  });
});
