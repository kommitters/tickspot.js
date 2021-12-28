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

  describe('when API call is successful', () => {
    const responseData = [{ id: '234' }, { id: '235' }];
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockResolvedValueOnce({ data: responseData });
    });

    it('should return the list of tick entries', async () => {
      const response = await client.entries.list(params);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('TICK_BASE_URL_START/123456/api/v2/entries.json',
        {
          headers: {
            Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
            'User-Agent': 'tickspot.js (user@kommit.co)',
          },
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        });
      expect(response).toEqual([{ id: '234' }, { id: '235' }]);
    });
  });

  describe('when list method returns an error', () => {
    const responseError = new Error('test');
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockRejectedValueOnce(responseError);
    });

    it('Should reject with an error', async () => {
      const response = await client.entries.list(params);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('TICK_BASE_URL_START/123456/api/v2/entries.json',
        {
          headers: {
            Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
            'User-Agent': 'tickspot.js (user@kommit.co)',
          },
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        });
      expect(response).toEqual(responseError);
    });
  });

  describe('when list method returns an error because of missing parameters', () => {
    const responseData = [{ id: '234' }, { id: '235' }];
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockResolvedValueOnce({ data: responseData });
    });

    it('Should reject with an error because of missing parameters', async () => {
      const responseEmpty = await client.entries.list({});
      const responseStartDate = await client.entries.list({ ...params, endDate: null });

      expect(axios.get).not.toHaveBeenCalled();
      expect(responseEmpty).toEqual(Error('startDate field is missing'));
      expect(responseStartDate).toEqual(Error('endDate field is missing'));
    });
  });
});
