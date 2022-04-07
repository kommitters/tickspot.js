import responseFactory from '#test/v2/factories/responseFactory';
import { notAcceptable } from '#test/v2/fixture/shared/responseData';
import { mockRejectedValueOnce, shouldHaveBeenCalledTimes } from './utils/axios';

/**
 * This will generate a test when a resource is not acceptable.
 *
 * @param {String} URL endpoint to generate the mock response.
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error.
 */

const notAcceptableTest = ({
  URL, method = 'get', requestToExecute,
}) => {
  describe('when the API call is not acceptable', () => {
    const responseData = responseFactory({
      requestData: {},
      responseType: 'notAcceptable',
      responseData: notAcceptable,
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
        expect(error).toEqual(new Error('Request Error: 406'));
      }
    });
  });
};

export default notAcceptableTest;
