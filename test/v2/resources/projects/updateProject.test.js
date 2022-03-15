import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import successfulResponseData from '#test/v2/fixture/projects/createProjectFixture.js';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/projects/123456.json`;

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
      const response = await client.projects.update(projectData);
      expect(response.data.name).toBe(projectData.name);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.projects.update(projectData);
    },
    URL,
    method: 'put',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.projects.update(projectData, {});
    },
    method: 'put',
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.projects.update(projectData, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    method: 'put',
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await client.projects.update(requestParams);
    },
    URL,
    method: 'put',
    requestData: {},
    paramsList: ['projectId'],
  });
});
