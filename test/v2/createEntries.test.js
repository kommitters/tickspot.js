import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import dataSuccessful from './fixture/entries/createResponseData.js';

jest.mock('axios');
jest.mock('#config', () => 'TICK_BASE_URL_START');
const client = tickspot({ apiVersion: 2, ...userInfo });
const createEntriesUrl = 'https://www.tickspot.com/123456/api/v2/entries.json';

describe('createTickEntries', () => {
  const dataEntry = {
    date: '2021-11-08',
    hours: 2,
    notes: 'Issue',
    taskId: 14356973,
  };

  describe('when API call is successful', () => {
    const succesfulResponse = responseFactory(dataEntry, 'created',
      dataSuccessful, createEntriesUrl);

    beforeEach(() => {
      axios.post.mockResolvedValueOnce(succesfulResponse);
    });

    it('should return the tick data entry', async () => {
      const response = await client.entries.create(dataEntry);

      expect(response).toBe(succesfulResponse.data);
    });

    it('should create the tick entry', async () => {
      const response = await client.entries.create(dataEntry);

      expect(response.data.date).toBe(dataEntry.date);
      expect(response.data.notes).toBe(dataEntry.notes);
    });
  });

  describe('when create method returns an error', () => {
    it('Should reject with an error when authentication fails', async () => {
      const authenticationError = responseFactory(dataEntry, 'authenticationError',
        {}, createEntriesUrl);
      axios.post.mockRejectedValueOnce(authenticationError);

      await expect(client.entries.create(dataEntry)).rejects.toThrow('authenticationError');
    });

    it('Should reject with an error when hours data missed', async () => {
      const dataEntryMissed = { ...dataEntry, hours: null };
      const dataMissedError = responseFactory(dataEntryMissed, 'dataMissedError',
        {}, createEntriesUrl, 'post');
      axios.post.mockRejectedValue(dataMissedError);

      await expect(
        client.entries.create(dataEntryMissed),
      ).rejects.toThrow('hours field is missing');
    });

    it('Should reject with an error when taskId data missed', async () => {
      const dataEntryMissed = { ...dataEntry, taskId: null };
      const dataMissedError = responseFactory(dataEntryMissed, 'dataMissedError',
        {}, createEntriesUrl);
      axios.post.mockRejectedValue(dataMissedError);

      await expect(
        client.entries.create(dataEntryMissed),
      ).rejects.toThrow('taskId field is missing');
    });
  });
});

describe('listTickEntries', () => {
  const params = {
    startDate: '2021-11-08',
    endDate: '2021-11-09',
    userId: 'userId',
  };

  const baseURL = 'TICK_BASE_URL_START/123456/api/v2/entries.json';
  const defaultHeaders = {
    Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
    'User-Agent': 'tickspot.js (user@kommit.co)',
  };

  describe('when API call is successful', () => {
    const responseData = [{ id: '234' }, { id: '235' }];
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockResolvedValueOnce({ data: responseData });
    });

    it('should return the list of tick entries', async () => {
      const response = await client.entries.list(params);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(baseURL,
        {
          headers: defaultHeaders,
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        });
      expect(response).toEqual([{ id: '234' }, { id: '235' }]);
    });
  });

  describe('when API call returns an error', () => {
    const responseError = 'test';
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockRejectedValueOnce(responseError);
    });

    it('an error should be thrown when making the call', async () => {
      await expect(client.entries.list(params)).rejects.toThrow(responseError);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(baseURL,
        {
          headers: defaultHeaders,
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        });
    });
  });

  describe('when the list method is not sent any parameter', () => {
    const responseData = [{ id: '234' }, { id: '235' }];
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockResolvedValueOnce({ data: responseData });
    });

    it('should throw an error specifying which parameter is missing', async () => {
      await expect(client.entries.list({})).rejects.toThrow('startDate field is missing');

      await expect(client.entries.list({ ...params, endDate: null }))
        .rejects.toThrow('endDate field is missing');

      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
