import axios from 'axios';
import Tickspot from '#src/index';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/tasks/createTaskFixture';
import responseFactory from '#test/v2/factories/responseFactory';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/tasks.json`;

describe('#create', () => {
  const params = {
    name: 'Test',
    projectId: 7890,
  };

  beforeEach(() => {
    axios.post.mockClear();
  });

  describe('when API call is successful', () => {
    const requestResponse = responseFactory({
      requestData: {},
      responseType: 'successful',
      responseData: successfulResponseData,
      URL,
    });

    beforeEach(() => {
      axios.post.mockResolvedValueOnce(requestResponse);
    });

    it('should return the data of the created task', async () => {
      const response = await tickspot.tasks.create(params);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        URL,
        { name: 'Test', project_id: 7890 },
        { headers: tickspot.tasks.DEFAULT_HEADERS },
      );
      expect(response).toEqual(requestResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await tickspot.tasks.create(params);
    },
    URL,
    method: 'post',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await tickspot.tasks.create(params, {});
    },
    method: 'post',
  });

  validResponseCallbackTests({
    method: 'post',
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await tickspot.tasks.create(params, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await tickspot.tasks.create(requestParams);
    },
    URL,
    requestData: params,
    paramsList: ['name', 'projectId'],
    method: 'post',
  });
});
