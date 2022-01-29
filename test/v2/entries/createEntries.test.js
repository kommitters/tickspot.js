import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import dataSuccessful from '#test/v2/fixture/entries/createResponseData.js';

jest.mock('axios');
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
