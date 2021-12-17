import axios from 'axios';
import Client from '#src/v2/index';
import createResponse from '#test/v2/fixture/entries/createResponse';
import userInfo from '#test/v2/fixture/client';

jest.mock('axios');
const client = new Client(userInfo);

describe('createTickEntries', () => {
  const dataEntry = {
    date: '2021-11-08',
    hours: 2,
    notes: 'Issue',
    taskId: 14356973,
  };
  const dataEntryMissed = { ...dataEntry, hours: null };

  const succesfulResponse = createResponse(dataEntry, 'succesful');
  const authenticationError = createResponse(dataEntry, 'authenticationError');
  const dataMissedError = createResponse(dataEntryMissed, 'dataMissedError');

  describe('when API call is successful', () => {
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
      axios.post.mockRejectedValueOnce(authenticationError);
      const response = await client.entries.create(dataEntry);

      expect(response).toBe(authenticationError.response.data);
    });

    it('Should reject with an error when required data missed', async () => {
      axios.post.mockRejectedValue(dataMissedError);
      const response = await client.entries.create({ ...dataEntryMissed, hours: null });

      expect(response).toEqual(new Error('hours field is missing'));
    });
  });
});
