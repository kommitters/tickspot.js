import axios from 'axios';
import { togglGetEntriesError, togglGetEntriesResponse } from '../../fixture/clients/toggl/listResponse.js';

import getEntries from '../../../src/clients/toggl/entries/list.js';

jest.mock('axios');

describe('togglAuth', () => {
  describe('when API call is successful', () => {
    it('should return the toggl data', async () => {
      axios.get.mockResolvedValueOnce(togglGetEntriesResponse);

      return expect(getEntries()).resolves.toBe(togglGetEntriesResponse.data);
    });
  });

  describe('when API call is not succesful', () => {
    it('Should reject with an error when authentication fails', async () => {
      axios.get.mockRejectedValueOnce(togglGetEntriesError);

      return expect(getEntries()).resolves.toEqual([]);
    });
  });
});
