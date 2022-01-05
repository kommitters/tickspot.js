import axios from 'axios';
import tickspot from '#src/index';
import createResponse from '#test/v2/fixture/entries/createResponse';
import userInfo from '#test/v2/fixture/client';

jest.mock('axios');
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

describe('getEntry', () => {
  describe('when API call is successful', () => {
    const responseData = createResponse({}, 'getEntrySuccesful');

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(responseData);
    });

    it('should return the entry information', async () => {
      const response = await client.entries.getEntry('123456');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.tickspot.com/123456/api/v2/entries/123456.json',
        {
          headers: {
            Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
            'User-Agent': 'tickspot.js (user@kommit.co)',
          },
        },
      );

      expect(response).toEqual(responseData.data);
    });
  });

  describe('When API call does not find a resource', () => {
    const responseData = createResponse({}, 'getEntryNotFound');

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(responseData);
    });

    it('should return 404 status', async () => {
      const response = await client.entries.getEntry('123456');

      expect(axios.get).toHaveBeenCalledWith(
        'https://www.tickspot.com/123456/api/v2/entries/123456.json',
        {
          headers: {
            Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
            'User-Agent': 'tickspot.js (user@kommit.co)',
          },
        },
      );

      expect(response.data.status).toEqual(404);
    });
  });

  describe('when getEntry method returns an error', () => {
    it('should reject with an error because of missing parameters', async () => {
      try {
        await client.entries.getEntry();
      } catch (error) {
        expect(error).toEqual(new Error('entryId field is missing'));
      }
    });
  });
});
