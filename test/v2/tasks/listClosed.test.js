import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import dataSuccessful from '#test/v2/fixture/tasks/closedTasksFixture';

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

  describe('when the API returns an authentication error', () => {
    const authenticationError = responseFactory({}, 'authenticationError',
      {}, listClosedTasksURL);

    beforeEach(() => {
      axios.get.mockRejectedValueOnce(authenticationError);
    });

    it('an error should be thrown when making the call', async () => {
      try {
        await client.tasks.listClosed();
      } catch (error) {
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(error).toEqual(new Error(authenticationError.response.data));
      }
    });
  });

  describe('when dataCallback is not a function', () => {
    it('should return a list of closed tasks', async () => {
      try {
        await client.tasks.listClosed({});
      } catch (error) {
        expect(axios.get).toHaveBeenCalledTimes(0);
        expect(error).toEqual(new Error('dataCallback must be a function'));
      }
    });
  });

  describe('when dataCallback is sent', () => {
    const succesfulResponse = responseFactory(
      {},
      'successful',
      dataSuccessful,
      listClosedTasksURL,
    );

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(succesfulResponse);
    });

    it('should call the dataCallback function', async () => {
      const dataCallback = jest.fn().mockImplementation((data) => ({ newStructure: { ...data } }));
      const response = await client.tasks.listClosed(dataCallback);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(dataCallback).toHaveBeenCalledTimes(1);

      expect(response).toEqual({ newStructure: { ...succesfulResponse.data } });
    });
  });
});
