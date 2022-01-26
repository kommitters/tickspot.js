import axios from 'axios';
import tickspot from '#src/index';
import userInfo from '#test/v2/fixture/client';
import dataEntriesSuccessful from './fixture/entries/listEntriesResponseData';
import responseFactory from './factories/responseFactory';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const getEntriesUrl = 'https://www.tickspot.com/123456/api/v2/entries.json';

describe('listTickEntries', () => {
  const params = {
    startDate: '2021-11-08',
    endDate: '2021-11-09',
    userId: 'userId',
  };

  const defaultHeaders = {
    Authorization: 'Token token=ar425598573462y24ec1ceee728981663',
    'User-Agent': 'tickspot.js (user@kommit.co)',
  };

  describe('when API call is successful', () => {
    const responseData = responseFactory({}, 'successful', dataEntriesSuccessful, getEntriesUrl);

    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockResolvedValueOnce(responseData);
    });

    it('should return the list of tick entries', async () => {
      const response = await client.entries.list(params);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(getEntriesUrl,
        {
          headers: defaultHeaders,
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        });
      expect(response).toEqual(responseData.data);
    });
  });

  describe('when API call returns an error', () => {
    const responseError = 'test error';
    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockRejectedValueOnce(responseError);
    });

    it('an error should be thrown when making the call', async () => {
      await expect(client.entries.list(params)).rejects.toThrow(responseError);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(getEntriesUrl,
        {
          headers: defaultHeaders,
          params: { end_date: '2021-11-09', start_date: '2021-11-08', user_id: 'userId' },
        });
    });
  });

  describe('when the list method is not sent any parameter', () => {
    const responseData = responseFactory({}, 'successful', dataEntriesSuccessful, getEntriesUrl);

    beforeEach(() => {
      axios.get.mockClear();
      axios.get.mockResolvedValueOnce(responseData);
    });

    it('should throw an error specifying which parameter is missing', async () => {
      await expect(client.entries.list({})).rejects.toThrow('startDate field is missing');

      await expect(client.entries.list({ ...params, endDate: null }))
        .rejects.toThrow('endDate field is missing');

      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
