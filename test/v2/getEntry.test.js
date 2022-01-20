import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/fixture/responseFactory';
import userInfo from '#test/v2/fixture/client';
import { dataEntrySuccessful, dataEntryNotFound } from './fixture/entries/getEntryResponseData.js';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const getEntryUrl = 'https://www.tickspot.com/114217/api/v2/entries/123456.json';

describe('getEntry', () => {
  describe('when API call is successful', () => {
    const responseData = responseFactory({}, 'succesful', dataEntrySuccessful, getEntryUrl);

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(responseData);
    });

    it('should return the entry information', async () => {
      const response = await client.entries.getEntry('123456');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.tickspot.com/123456/api/v2/entries/123456.json',
        {
          headers: {
            Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
            'User-Agent': 'tickspot.js (user@kommit.co)',
          },
        },
      );

      expect(response).toEqual(responseData.data);
    });
  });

  describe('when API call does not find a resource', () => {
    const responseData = responseFactory({}, 'notFound', dataEntryNotFound, getEntryUrl);

    beforeEach(() => {
      axios.get.mockResolvedValueOnce(responseData);
    });

    it('should return 404 status', async () => {
      const response = await client.entries.getEntry('123456');

      expect(axios.get).toHaveBeenCalledWith(
        'https://www.tickspot.com/123456/api/v2/entries/123456.json',
        {
          headers: {
            Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
            'User-Agent': 'tickspot.js (user@kommit.co)',
          },
        },
      );

      expect(response.data.status).toEqual(404);
    });
  });

  describe('when getEntry method returns an error', () => {
    it('should reject with an error because of missing parameters', async () => {
      try {
        await client.entries.getEntry();
      } catch (error) {
        expect(error).toEqual(new Error('entryId field is missing'));
      }
    });
  });
});
