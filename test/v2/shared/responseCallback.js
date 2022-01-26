import axios from 'axios';
import responseFactory from '#test/v2/factories/responseFactory';

const badResponseCallbackTests = ({
  requestToExecute,
}) => {
  describe('when responseCallback is not a function', () => {
    it('an error should be thrown validating the responseCallback', async () => {
      try {
        await requestToExecute();
      } catch (error) {
        expect(axios.get).toHaveBeenCalledTimes(0);
        expect(error).toEqual(
          new Error('responseCallback must be a function'),
        );
      }
    });
  });
};

const validResponseCallbackTests = ({
  method = 'get', URL, responseData, requestToExecute,
}) => {
  describe('when responseCallback is sent', () => {
    const succesfulResponse = responseFactory(
      {},
      'successful',
      responseData,
      URL,
      method,
    );

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

    it('should call the responseCallback function', async () => {
      const [response, dataCallback] = await requestToExecute();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(dataCallback).toHaveBeenCalledTimes(1);

      expect(response).toEqual({ newStructure: { ...succesfulResponse.data } });
    });
  });
};

export {
  badResponseCallbackTests,
  validResponseCallbackTests,
};
