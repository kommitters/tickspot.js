import responseFactory from '#test/v2/factories/responseFactory';
import { notFoundResponse } from '#test/v2/fixture/shared/responseData';
import { mockRejectedValueOnce, shouldHaveBeenCalledTimes } from './utils/axios';

/**
 * This will generate a test when a resource is not found.
 *
 * @param {String} URL endpoint to generate the mock response.
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error.
 */
const notFoundTests = ({
  URL, method = 'get', requestToExecute,
}) => {
  describe('when the API call does not find a resource', () => {
    const responseData = responseFactory({
      requestData: {},
      responseType: 'notFound',
      responseData: notFoundResponse,
      URL,
    });

    beforeEach(() => {
      mockRejectedValueOnce({ method, responseData });
    });

    it('an error should be thrown when making the call', async () => {
      try {
        await requestToExecute();
      } catch (error) {
        shouldHaveBeenCalledTimes({ method, times: 1 });
        expect(error).toEqual(new Error('Request Error: 404'));
      }
    });
  });
};

export default notFoundTests;
