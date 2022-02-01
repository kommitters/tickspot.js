import axios from 'axios';
import tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import userInfo from '#test/v2/fixture/client';
import succesfulResponseData from '#test/v2/fixture/entries/updateEntryResponseData';
import notFoundTests from '#test/v2/shared/notFound';
import unprocessableEntityTests from '#test/v2/shared/unprocessableEntity';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const client = tickspot({ apiVersion: 2, ...userInfo });
const URL = `${client.baseURL}/entries/123456.json`;

describe('updateEntry', () => {
  const requestResponse = responseFactory({
    requestData: {},
    responseType: 'successful',
    responseData: succesfulResponseData,
    URL,
    method: 'put',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the API call is successful', () => {
    beforeEach(() => {
      axios.put.mockResolvedValueOnce(requestResponse);
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
      expect(response).toEqual(requestResponse.data);
    });
  });

  notFoundTests({
    requestToExecute: async () => {
      const data = {
        entryId: 654321,
        date: '2022-01-20',
        hours: 2,
        notes: 'Update entry test',
        taskId: 14541850,
        userId: 337683,
        billed: false,
      };

      await client.entries.updateEntry(data);
    },
    URL,
    method: 'put',
  });

  unprocessableEntityTests({
    requestToExecute: async () => {
      const data = {
        entryId: 654321,
        taskId: 111,
      };

      await client.entries.updateEntry(data);
    },
    URL,
    method: 'put',
  });

  badResponseCallbackTests({
    requestToExecute: async () => {
      const data = {
        entryId: 654321,
        taskId: 111,
      };
      await client.entries.updateEntry(data, {});
    },
  });

  validResponseCallbackTests({
    requestToExecute: async () => {
      const dataCallback = jest
        .fn()
        .mockImplementation((data) => ({ newStructure: { ...data } }));

      const data = {
        entryId: 654321,
        taskId: 111,
      };
      const response = await client.entries.updateEntry(data, dataCallback);
      return [response, dataCallback];
    },
    responseData: succesfulResponseData,
    URL,
    method: 'put',
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await client.entries.updateEntry(requestParams);
    },
    URL,
    requestData: {},
    paramsList: ['entryId'],
  });
});
