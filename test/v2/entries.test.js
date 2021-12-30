import axios from 'axios';
import tickspot from '#src/index';
import createResponse from '#test/v2/fixture/entries/createResponse';
import userInfo from '#test/v2/fixture/client';

jest.mock('axios');
jest.mock('#config', () => 'TICK_BASE_URL_START');
const client = tickspot({ apiVersion: 2, ...userInfo });

describe('createTickEntries', () => {
  const dataEntry = {
    date: '2021-11-08',
    hours: 2,
    notes: 'Issue',
    taskId: 14356973,
  };

  describe('when API call is successful', () => {
    const succesfulResponse = createResponse(dataEntry, 'succesful');
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
      const authenticationError = createResponse(dataEntry, 'authenticationError');
      axios.post.mockRejectedValueOnce(authenticationError);
      const response = await client.entries.create(dataEntry);

      expect(response).toBe(authenticationError.response.data);
    });

    it('Should reject with an error when hours data missed', async () => {
      const dataEntryMissed = { ...dataEntry, hours: null };
      const dataMissedError = createResponse(dataEntryMissed, 'dataMissedError');
      axios.post.mockRejectedValue(dataMissedError);
      const response = await client.entries.create(dataEntryMissed);

      expect(response).toEqual(new Error('hours field is missing'));
    });

    it('Should reject with an error when taskId data missed', async () => {
      const dataEntryMissed = { ...dataEntry, taskId: null };
      const dataMissedError = createResponse(dataEntryMissed, 'dataMissedError');
      axios.post.mockRejectedValue(dataMissedError);
      const response = await client.entries.create(dataEntryMissed);

      expect(response).toEqual(new Error('taskId field is missing'));
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

  describe('when list method returns an error', () => {
    const responseError = 'test';
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockRejectedValueOnce(responseError);
    });

    it('Should reject with an error', async () => {
      await expect(client.entries.list(params)).rejects.toThrow(responseError);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(baseURL,
        {
          headers: defaultHeaders,
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        });
    });
  });

  describe('when list method returns an error because of missing parameters', () => {
    const responseData = [{ id: '234' }, { id: '235' }];
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockResolvedValueOnce({ data: responseData });
    });

    it('Should reject with an error because of missing parameters', async () => {
      await expect(client.entries.list({})).rejects.toThrow('startDate field is missing');

      await expect(client.entries.list({ ...params, endDate: null }))
        .rejects.toThrow('endDate field is missing');

      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
