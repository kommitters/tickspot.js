import axios from 'axios';
import getTogglEntries from '#src/clients/toggl/entries/list.js';
import { togglGetEntriesError, togglGetEntriesResponse } from '#test/fixture/clients/toggl/listResponse';

jest.mock('axios');

describe('togglListEntries', () => {
  describe('when API call is successful', () => {
    it('should return the toggl data', async () => {
      axios.get.mockResolvedValueOnce(togglGetEntriesResponse);
      const response = await getTogglEntries();

      return expect(response).toBe(togglGetEntriesResponse.data);
    });
  });

  describe('when API call is not succesful', () => {
    it('Should reject with an error when authentication fails', async () => {
      axios.get.mockRejectedValueOnce(togglGetEntriesError);
      const response = await getTogglEntries();

      return expect(response).toEqual([]);
    });
  });
});
