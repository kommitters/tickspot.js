import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/projects/createProjectFixture.js';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/projects/123456.json`;

describe('#update', () => {
  const projectData = {
    projectId: 123456,
    name: 'test #1',
    clientId: 654321,
    ownerId: 987654,
    budget: 50.0,
    notifications: false,
    billable: false,
    recurring: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when API call is successful', () => {
    const requestResponse = responseFactory({
      requestData: projectData,
      responseType: 'successful',
      responseData: successfulResponseData,
      URL,
    });

    beforeEach(() => {
      axios.put.mockResolvedValueOnce(requestResponse);
    });

    it('should update the specific project', async () => {
      const response = await tickspot.projects.update(projectData);
      expect(response.data.name).toBe(projectData.name);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.projects.update(projectData);
    },
    URL,
    method: 'put',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.projects.update(projectData, {});
    },
    method: 'put',
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.projects.update(projectData, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    method: 'put',
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await tickspot.projects.update(requestParams);
    },
    URL,
    method: 'put',
    requestData: {},
    paramsList: ['projectId'],
  });
});
