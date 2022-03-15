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
const URL = `${client.baseURL}/projects.json`;

describe('#create', () => {
  const projectData = {
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
      responseType: 'created',
      responseData: successfulResponseData,
      URL,
    });

    beforeEach(() => {
      axios.post.mockResolvedValueOnce(requestResponse);
    });

    it('should create the new project', async () => {
      const response = await client.projects.create(projectData);
      expect(response.data.name).toBe(projectData.name);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.projects.create(projectData);
    },
    URL,
    method: 'post',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.projects.create(projectData, {});
    },
    method: 'post',
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.projects.create(projectData, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    method: 'post',
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await client.projects.create(requestParams);
    },
    URL,
    method: 'post',
    requestData: projectData,
    paramsList: ['name', 'clientId', 'ownerId'],
  });
});
