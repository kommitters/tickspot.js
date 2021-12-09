import axios from 'axios';
import Client from '#src/index';
import dataEntryCreate from '#test/fixture/entries/dataEntries';
import infoUser from '#test/fixture/client';
import {
  createEntriesResponse,
  createEntriesError,
  createEntriesMissedData,
} from '#test/fixture/entries/createResponse';

jest.mock('axios');
const client = new Client(infoUser);

describe('createTickEntries', () => {
  describe('when API call is successful', () => {
    beforeEach(() => {
      axios.post.mockResolvedValueOnce(createEntriesResponse);
    });

    it('should return the tick data entry', async () => {
      const response = await client.entries.create(dataEntryCreate);

      expect(response).toBe(createEntriesResponse.data);
    });

    it('should create the tick entry', async () => {
      const response = await client.entries.create(dataEntryCreate);

      expect(response.data.date).toBe(dataEntryCreate.date);
      expect(response.data.notes).toBe(dataEntryCreate.notes);
    });
  });

  describe('when API call is not succesful', () => {
    it('Should reject with an error when authentication fails', async () => {
      axios.post.mockRejectedValueOnce(createEntriesError);
      const response = await client.entries.create(dataEntryCreate);

      expect(response).toBe(createEntriesError.response.data);
    });

    it('Should reject with an error when required data missed', async () => {
      axios.post.mockRejectedValue(createEntriesMissedData);
      const response = await client.entries.create({ ...dataEntryCreate, hours: null });

      expect(response).toBe(createEntriesMissedData.response.data);
    });
  });
});
