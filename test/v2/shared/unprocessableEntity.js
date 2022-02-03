import responseFactory from '#test/v2/factories/responseFactory';
import { unprocessableEntityResponse } from '#test/v2/fixture/shared/responseData';
import { mockRejectedValueOnce, shouldHaveBeenCalledTimes } from './utils/axios';

/**
 * This will generate a test for Unprocessable Entity.
 *
 * @param {String} URL endpoint to generate the mock response.
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error.
 */
const unprocessableEntityTests = ({
  URL, method = 'get', requestToExecute,
}) => {
  describe('when the API call does not find a resource', () => {
    const responseData = responseFactory({
      requestData: {},
      responseType: 'unprocessableEntity',
      responseData: unprocessableEntityResponse,
      URL,
      method,
    });

    beforeEach(() => {
      mockRejectedValueOnce({ method, responseData });
    });

    it('an error should be thrown when making the call', async () => {
      try {
        await requestToExecute();
      } catch (error) {
        shouldHaveBeenCalledTimes({ method, times: 1 });
        expect(error).toEqual(new Error('Request Error: 422'));
      }
    });
  });
};

export default unprocessableEntityTests;
