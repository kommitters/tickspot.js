import axios from 'axios';
import responseFactory from '#test/v2/factories/responseFactory';

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
      if (method === 'get') {
        axios.get.mockRejectedValueOnce(authenticationError);
      } else if (method === 'post') {
        axios.post.mockRejectedValueOnce(authenticationError);
      } else if (method === 'put') {
        axios.put.mockRejectedValueOnce(authenticationError);
      } else if (method === 'delete') {
        axios.delete.mockRejectedValueOnce(authenticationError);
      }
    });

    it('an error should be thrown when making the call', async () => {
      try {
        await requestToExecute();
      } catch (error) {
        if (method === 'get') {
          expect(axios.get).toHaveBeenCalledTimes(1);
        } else if (method === 'post') {
          expect(axios.post).toHaveBeenCalledTimes(1);
        } else if (method === 'put') {
          expect(axios.put).toHaveBeenCalledTimes(1);
        } else if (method === 'delete') {
          expect(axios.delete).toHaveBeenCalledTimes(1);
        }
        expect(error).toEqual(new Error('Request Error: 401'));
      }
    });
  });
};

export default authenticationErrorTests;
