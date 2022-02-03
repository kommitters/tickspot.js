import BaseResource from '#src/v2/baseResource';
import userInfo from '#test/v2/fixture/client';
import { TICK_BASE_URL_START } from '#src/v2/constants';
import {
  badResponseCallbackTests,
  validResponseCallbackTests,
} from '#test/v2/shared/responseCallback';
import { mockResolvedValueOnce, shouldHaveBeenCalledTimes } from './shared/utils/axios';

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
      describe(`when makeRequest is called for ${method}`, () => {
        beforeEach(() => {
          mockResolvedValueOnce({ method, responseData: { data: {} } });
        });

        it(`should also call axios.${method}`, async () => {
          const result = await resource.makeRequest({
            URL,
            method,
            ...(method === 'get' && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { params: { test: 'abcd' } }),
            ...((method === 'post' || method === 'put') && { body: { test: 'abcd' } }),
          });

          expect(result).toEqual(method === 'delete' ? true : {});

          shouldHaveBeenCalledTimes({ method, times: 1 });
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

    describe('when the method does not exist', () => {
      it('an error should be thrown', async () => {
        try {
          await resource.makeRequest({
            URL,
            method: 'wrong',
          });
        } catch (error) {
          expect(error).toEqual(new Error('Method not allowed'));
        }
      });
    });
  });
});
