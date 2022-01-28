import axios from 'axios';
import responseFactory from '#test/v2/factories/responseFactory';

/**
 * This will generate a test when a required param is not sent.
 *
 * @param {String} URL endpoint to generate the mock response.
 * @param {String} method HTTP method.
 * @param {callback} requestToExecute
 *    receives a function that will execute the request that will throw the error
 * @param {Array} paramsList list of required params
 * @param {Object} requestData object of params to send in the request.
 * @param {Boolean} positionalParam true if method receives a positional param,
 *                                  false if mehtod receives an object of named params
 */
const wrongParamsTests = ({
  URL,
  method = 'get',
  requestToExecute,
  paramsList = [],
  requestData,
  positionalParam = false,
}) => {
  paramsList.forEach((param) => {
    describe(`when the API return a missing param error (${param})`, () => {
      const requestParams = positionalParam ? param : { ...requestData, [param]: null };
      const requestParamsError = responseFactory({
        requestData: requestParams,
        responseType: 'unprocessableEntity',
        responseData: {},
        URL,
        method,
      });

      beforeEach(() => {
        if (method === 'get') {
          axios.get.mockRejectedValueOnce(requestParamsError);
        } else if (method === 'post') {
          axios.post.mockRejectedValueOnce(requestParamsError);
        } else if (method === 'put') {
          axios.put.mockRejectedValueOnce(requestParamsError);
        } else if (method === 'delete') {
          axios.delete.mockRejectedValueOnce(requestParamsError);
        }
      });

      it('an error should be thrown when making the call', async () => {
        try {
          if (positionalParam) {
            await requestToExecute();
          } else {
            await requestToExecute(requestParams);
          }
        } catch (error) {
          expect(error).toEqual(new Error(`${param} field is missing`));
        }
      });
    });
  });
};

export default wrongParamsTests;
