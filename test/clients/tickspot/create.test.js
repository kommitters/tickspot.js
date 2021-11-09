import axios from 'axios';
import createTickEntries from '#src/clients/tickspot/entries/create.js';
import dataEntry from '#test/fixture/clients/tickspot/dataEntryCreateEntry.js';
import {
  tickCreateEntriesResponse,
  tickCreateEntriesError,
  tickCreateEntriesMissedData,
} from '#test/fixture/clients/tickspot/createResponse';

jest.mock('axios');

describe('createTickEntries', () => {
  const userAgent = 'user@kommit.co';
  describe('when API call is successful', () => {
    beforeEach(() => {
      axios.post.mockResolvedValueOnce(tickCreateEntriesResponse);
    });

    it('should return the tick data entry', async () => {
      const response = await createTickEntries(dataEntry, userAgent);

      expect(response).toBe(tickCreateEntriesResponse.data);
    });

    it('should create the tick entry', async () => {
      const response = await createTickEntries(dataEntry, userAgent);

      expect(response.data.date).toBe(dataEntry.date);
      expect(response.data.notes).toBe(dataEntry.notes);
    });
  });

  describe('when API call is not succesful', () => {
    it('Should reject with an error when authentication fails', async () => {
      axios.post.mockRejectedValueOnce(tickCreateEntriesError);
      const response = await createTickEntries(dataEntry, userAgent);

      expect(response).toBe(tickCreateEntriesError.response.data);
    });

    it('Should reject with an error when required data missed', async () => {
      axios.post.mockRejectedValue(tickCreateEntriesMissedData);
      const response = await createTickEntries({ ...dataEntry, hours: null }, userAgent);

      expect(response).toBe(tickCreateEntriesMissedData.response.data);
    });
  });
});
