import axios from 'axios';
import Tickspot from '#src/index';
import responseFactory from '#test/v2/factories/responseFactory';
import credentials from '#test/v2/fixture/credentials';
import successfulResponseData from '#test/v2/fixture/entries/updateEntryFixture';
import notFoundTests from '#test/v2/shared/notFound';
import unprocessableEntityTests from '#test/v2/shared/unprocessableEntity';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import wrongParamsTests from '#test/v2/shared/wrongParams';

jest.mock('axios');
const tickspot = Tickspot.init({ apiVersion: 2, ...credentials });
const URL = `${tickspot.baseURL}/entries/123456.json`;

describe('#update', () => {
  const requestResponse = responseFactory({
    requestData: {},
    responseType: 'successful',
    responseData: successfulResponseData,
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

      const response = await tickspot.entries.update(data);

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

      await tickspot.entries.update(data);
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

      await tickspot.entries.update(data);
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
      await tickspot.entries.update(data, {});
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
      const response = await tickspot.entries.update(data, dataCallback);
      return [response, dataCallback];
    },
    responseData: successfulResponseData,
    URL,
    method: 'put',
  });

  wrongParamsTests({
    requestToExecute: async (requestParams) => {
      await tickspot.entries.update(requestParams);
    },
    URL,
    requestData: {},
    paramsList: ['entryId'],
  });
});
