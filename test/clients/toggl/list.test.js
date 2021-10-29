import axios from 'axios';
import getTogglEntries from 'toggltick-js/src/clients/toggl/entries/list';
import { togglGetEntriesError, togglGetEntriesResponse } from '../../fixture/clients/toggl/listResponse.js';

jest.mock('axios');

describe('togglAuth', () => {
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
