import axios from 'axios';
import responseFactory from '#test/v2/factories/responseFactory';

/**
 * This will generate a test when the callback sent to a function is not a function.
 *
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error
 */
const badResponseCallbackTests = ({
  method = 'get', requestToExecute,
}) => {
  describe('when responseCallback is not a function', () => {
    it('an error should be thrown validating the responseCallback', async () => {
      try {
        await requestToExecute();
      } catch (error) {
        if (method === 'get') {
          expect(axios.get).toHaveBeenCalledTimes(0);
        } else if (method === 'post') {
          expect(axios.post).toHaveBeenCalledTimes(0);
        } else if (method === 'put') {
          expect(axios.put).toHaveBeenCalledTimes(0);
        } else if (method === 'delete') {
          expect(axios.delete).toHaveBeenCalledTimes(0);
        }
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
    const succesfulResponse = responseFactory({
      requestData: {},
      responseType: method === 'delete' ? 'successfulNoContent' : 'successful',
      responseData,
      URL,
      method,
    });

    beforeEach(() => {
      if (method === 'get') {
        axios.get.mockResolvedValueOnce(succesfulResponse);
      } else if (method === 'post') {
        axios.post.mockResolvedValueOnce(succesfulResponse);
      } else if (method === 'put') {
        axios.put.mockResolvedValueOnce(succesfulResponse);
      } else if (method === 'delete') {
        axios.delete.mockResolvedValueOnce(succesfulResponse);
      }
    });

    it(`should ${method === 'delete' ? 'NOT' : ''} call the responseCallback function`,
      async () => {
        const [response, dataCallback] = await requestToExecute();

        if (method === 'get') {
          expect(axios.get).toHaveBeenCalledTimes(1);
        } else if (method === 'post') {
          expect(axios.post).toHaveBeenCalledTimes(1);
        } else if (method === 'put') {
          expect(axios.put).toHaveBeenCalledTimes(1);
        } else if (method === 'delete') {
          expect(axios.delete).toHaveBeenCalledTimes(1);
        }

        if (method !== 'delete') {
          expect(dataCallback).toHaveBeenCalledTimes(1);
          expect(response).toEqual({ newStructure: { ...succesfulResponse.data } });
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
