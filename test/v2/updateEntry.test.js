import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import dataEntrySuccessful from './fixture/entries/updateEntryResponseData';
import { notFoundResponse, unprocessableEntityResponse } from './fixture/shared/responseData';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const updateEntryUrl = 'https://www.tickspot.com/123456/api/v2/entries/123456.json';

describe('updateEntry', () => {
  describe('when the API call is successful', () => {
    const responseData = responseFactory({}, 'successful',
      dataEntrySuccessful, updateEntryUrl, 'put');

    beforeEach(() => {
      axios.put.mockResolvedValueOnce(responseData);
    });

    it('should return the updated entry information', async () => {
      const data = {
        entryId: 123456,
        date: '2022-01-20',
        hours: 2,
        notes: 'Update entry test',
        taskId: 14541850,
        userId: 337683,
        billed: false,
      };

      const response = await client.entries.updateEntry(data);

      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(response).toEqual(responseData.data);
    });
  });

  describe('when the API call does not find a entry', () => {
    const responseData = responseFactory({}, 'notFound', notFoundResponse, updateEntryUrl, 'put');

    beforeEach(() => {
      axios.put.mockResolvedValueOnce(responseData);
    });

    it('should return 404 status', async () => {
      const data = {
        entryId: 654321,
        date: '2022-01-20',
        hours: 2,
        notes: 'Update entry test',
        taskId: 14541850,
        userId: 337683,
        billed: false,
      };

      const response = await client.entries.updateEntry(data);
      expect(response.data.status).toEqual(404);
    });
  });

  describe('when the API call responds with an unprocessable entity', () => {
    const responseData = responseFactory({}, 'notFound',
      unprocessableEntityResponse, updateEntryUrl, 'put');

    beforeEach(() => {
      axios.put.mockResolvedValueOnce(responseData);
    });

    it('should return 422 status', async () => {
      const data = {
        entryId: 654321,
        taskId: 111,
      };

      const response = await client.entries.updateEntry(data);
      expect(response.data.status).toEqual(422);
    });
  });

  describe('when updateEntry method returns an error', () => {
    it('should reject with an error because of missing parameters', async () => {
      try {
        await client.entries.updateEntry({});
      } catch (error) {
        expect(error).toEqual(new Error('entryId field is missing'));
      }
    });
  });
});
