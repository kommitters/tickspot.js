import responseFactory from '#test/v2/factories/responseFactory';
import { mockRejectedValueOnce, shouldHaveBeenCalledTimes } from './utils/axios';

/**
 * This will generate a test when auth fails.
 *
 * @param {String} URL endpoint to generate the mock response.
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error.
 */
const authenticationErrorTests = ({
  URL, method = 'get', requestToExecute,
}) => {
  describe('when the API returns an authentication error', () => {
    const authenticationError = responseFactory({
      requestData: {},
      responseType: 'authenticationError',
      responseData: {},
      URL,
    });

    beforeEach(() => {
      mockRejectedValueOnce({ method, responseData: authenticationError });
    });

    it('an error should be thrown when making the call', async () => {
      try {
        await requestToExecute();
      } catch (error) {
        shouldHaveBeenCalledTimes({ method, times: 1 });
        expect(error).toEqual(new Error('Request Error: 401'));
      }
    });
  });
};

export default authenticationErrorTests;
