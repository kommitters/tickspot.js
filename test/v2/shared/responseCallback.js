import responseFactory from '#test/v2/factories/responseFactory';
import { mockResolvedValueOnce, shouldHaveBeenCalledTimes } from './utils/axios';

/**
 * This will generate a test when the callback sent to a function is not a function.
 *
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error.
 */
const badResponseCallbackTests = ({
  method = 'get', requestToExecute,
}) => {
  describe('when responseCallback is not a function', () => {
    it('an error should be thrown validating the responseCallback', async () => {
      try {
        await requestToExecute();
      } catch (error) {
        shouldHaveBeenCalledTimes({ method, times: 0 });
        expect(error).toEqual(
          new Error('responseCallback must be a function'),
        );
      }
    });
  });
};

/**
 * This will generate a test when a correct callback is sent.
 *
 * @param {String} URL endpoint to generate the mock response.
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error
 */
const validResponseCallbackTests = ({
  URL, method = 'get', responseData, requestToExecute,
}) => {
  describe('when responseCallback is sent', () => {
    const successfulResponse = responseFactory({
      requestData: {},
      responseType: method === 'delete' ? 'successfulNoContent' : 'successful',
      responseData,
      URL,
      method,
    });

    beforeEach(() => {
      mockResolvedValueOnce({ method, responseData: successfulResponse });
    });

    it(`should ${method === 'delete' ? 'NOT' : ''} call the responseCallback function`,
      async () => {
        const [response, dataCallback] = await requestToExecute();

        shouldHaveBeenCalledTimes({ method, times: 1 });

        if (method !== 'delete') {
          expect(dataCallback).toHaveBeenCalledTimes(1);
          expect(response).toEqual({ newStructure: { ...successfulResponse.data } });
        } else {
          expect(dataCallback).toHaveBeenCalledTimes(0);
        }
      });
  });
};

export {
  badResponseCallbackTests,
  validResponseCallbackTests,
};
