import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import { noContentResponse } from './fixture/shared/responseData';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const getEntryUrl = 'https://www.tickspot.com/123456/api/v2/entries/123456.json';

describe('deleteEntry', () => {
  describe('when API call is successful', () => {
    const responseData = responseFactory({}, 'successfulNoContent', noContentResponse, getEntryUrl);
    axios.delete.mockResolvedValueOnce(responseData);

    it('should return true ', async () => {
      const response = await client.entries.deleteEntry('123456');

      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith(
        'https://www.tickspot.com/123456/api/v2/entries/123456.json',
        {
          headers: {
            Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
            'User-Agent': 'tickspot.js (user@kommit.co)',
          },
        },
      );

      expect(response).toEqual(true);
    });
  });

  describe('when API call does not find a resource', () => {
    it('should raise a 404 error', async () => {
      const notFoundError = new Error('Request Error');
      notFoundError.response = { status: 404 };

      axios.delete.mockRejectedValueOnce(notFoundError);

      try {
        await client.entries.deleteEntry('654321');
      } catch (error) {
        expect(error).toEqual(new Error('Request Error: 404'));
      }
    });
  });

  describe('when deleteEntry method returns an error', () => {
    it('should reject with an error because of missing parameters', async () => {
      try {
        await client.entries.deleteEntry();
      } catch (error) {
        expect(error).toEqual(new Error('entryId field is missing'));
      }
    });
  });
});
