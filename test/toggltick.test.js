import axios from 'axios';
import { togglError, togglResponse } from './fixtures/togglApi';

import { togglAuth } from '../src/togglAuth';

jest.mock('axios');

describe('togglAuth', () => {
  describe('when API call is successful', () => {
    it('should return the toggl data', async () => {
      axios.get.mockResolvedValueOnce(togglResponse);
      return expect(togglAuth()).resolves.toBe(togglResponse.data);
    });
  });
  describe('when API call is not succesful', () => {
    it('Should reject with an error when authentication fails', async () => {
      axios.get.mockRejectedValueOnce(togglError);
      return expect(togglAuth()).resolves.toBe(togglError.response);
    });
  });
});
