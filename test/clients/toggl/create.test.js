import axios from 'axios';
import createTogglEntries from '#src/clients/toggl/entries/create.js';
import { dataEntryCreate, dataEntryCreateMissed } from '#test/fixture/clients/toggl/dataEntryCreateEntry.js';
import { togglCreateEntriesError, togglCreateEntriesResponse, toogglCreateEntriesMissedData } from '#test/fixture/clients/toggl/createResponse';

jest.mock('axios');

describe('togglCreateEntries', () => {
  describe('when API call is successful', () => {
    beforeEach(() => {
      axios.post.mockResolvedValueOnce(togglCreateEntriesResponse);
    });

    it('should return the toggl data entry', async () => {
      const response = await createTogglEntries(dataEntryCreate);

      expect(response).toBe(togglCreateEntriesResponse.data);
    });

    it('should create the toggl entry', async () => {
      const response = await createTogglEntries(dataEntryCreate);

      expect(response.data.start).toBe(dataEntryCreate.start);
      expect(response.data.description).toBe(dataEntryCreate.description);
    });
  });

  describe('when API call is not succesful', () => {
    it('Should reject with an error when authentication fails', async () => {
      axios.post.mockRejectedValueOnce(togglCreateEntriesError);
      const response = await createTogglEntries(dataEntryCreate);

      expect(response).toBe(togglCreateEntriesError.response.data);
    });

    it('Should reject with an error when required data missed', async () => {
      axios.post.mockRejectedValue(toogglCreateEntriesMissedData);
      const response = await createTogglEntries(dataEntryCreateMissed);

      expect(response).toBe(toogglCreateEntriesMissedData.response.data);
    });
  });
});
