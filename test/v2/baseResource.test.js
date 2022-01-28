import axios from 'axios';
import BaseResource from '#src/v2/baseResource';
import userInfo from '#test/v2/fixture/client';
import { TICK_BASE_URL_START } from '#src/v2/constants';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';

jest.mock('axios');
const auth = `Token token=${userInfo.apiToken}`;
const URL = TICK_BASE_URL_START;
const resource = new BaseResource({
  auth, baseURL: URL, agentEmail: userInfo.agentEmail,
});

describe('BaseResource', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('.makeRequest', () => {
    describe.each(['get', 'post', 'put', 'delete'])('.%s method', (method) => {
      describe(`When makeRequest is called for ${method}`, () => {
        beforeEach(() => {
          if (method === 'get') {
            axios.get.mockResolvedValueOnce({ data: {} });
          } else if (method === 'post') {
            axios.post.mockResolvedValueOnce({ data: {} });
          } else if (method === 'put') {
            axios.put.mockResolvedValueOnce({ data: {} });
          } else if (method === 'delete') {
            axios.delete.mockResolvedValueOnce({ status: 204 });
          }
        });

        it(`Should also call axios.${method}`, async () => {
          const result = await resource.makeRequest({
            URL,
            method,
            ...(method === 'get' && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { body: { test: 'abcd' } }),
          });

          expect(result).toEqual(method === 'delete' ? true : {});

          if (method === 'get') {
            expect(axios.get).toHaveBeenCalledTimes(1);
          } else if (method === 'post') {
            expect(axios.post).toHaveBeenCalledTimes(1);
          } else if (method === 'put') {
            expect(axios.put).toHaveBeenCalledTimes(1);
          } else if (method === 'delete') {
            expect(axios.delete).toHaveBeenCalledTimes(1);
          }
        });
      });

      badResponseCallbackTests({
        requestToExecute: async () => {
          await resource.makeRequest({
            URL,
            method,
            ...(method === 'get' && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { body: { test: 'abcd' } }),
            responseCallback: {},
          });
        },
        method,
      });

      validResponseCallbackTests({
        requestToExecute: async () => {
          const dataCallback = jest
            .fn()
            .mockImplementation((data) => ({ newStructure: { ...data } }));
          const response = await resource.makeRequest({
            URL,
            method,
            ...(method === 'get' && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { body: { test: 'abcd' } }),
            responseCallback: dataCallback,
          });
          return [response, dataCallback];
        },
        responseData: {},
        URL,
        method,
      });
    });
  });
});
