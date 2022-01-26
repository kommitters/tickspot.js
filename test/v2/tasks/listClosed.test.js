import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import dataSuccessful from '#test/v2/fixture/tasks/closedTasksFixture';
import authenticationErrorTests from '#test/v2/shared/authentication';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const listClosedTasksURL = `${client.baseURL}/tasks/closed.json`;

describe('#listClosed', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  describe('when API call is successful', () => {
    const succesfulResponse = responseFactory(
      {},
      'successful',
      dataSuccessful,
      listClosedTasksURL,
    );

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(succesfulResponse);
    });

    it('should return a list of closed tasks', async () => {
      const response = await client.tasks.listClosed();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(succesfulResponse.data);
    });
  });

  authenticationErrorTests({
    requestToExecute: async () => {
      await client.tasks.listClosed();
    },
    URL: listClosedTasksURL,
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      await client.tasks.listClosed({});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.tasks.listClosed(dataCallback);
      return [response, dataCallback];
    },
    responseData: dataSuccessful,
  });
});
