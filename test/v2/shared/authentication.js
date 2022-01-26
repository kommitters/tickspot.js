import axios from 'axios';
import responseFactory from '#test/v2/factories/responseFactory';

const authenticationErrorTests = ({
  method = 'get', URL, requestToExecute,
}) => {
  describe('when the API returns an authentication error', () => {
    const authenticationError = responseFactory({}, 'authenticationError',
      {}, URL);

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
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(error).toEqual(new Error('Request Error: 401'));
      }
    });
  });
};

export default authenticationErrorTests;
