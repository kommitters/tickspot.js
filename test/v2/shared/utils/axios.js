import axios from 'axios';

const mockResolvedValueOnce = ({ method = 'get', responseData = {} }) => {
  switch (method) {
    case 'get':
      axios.get.mockResolvedValueOnce(responseData);
      break;
    case 'post':
      axios.post.mockResolvedValueOnce(responseData);
      break;
    case 'put':
      axios.put.mockResolvedValueOnce(responseData);
      break;
    case 'delete':
      axios.delete.mockResolvedValueOnce({ status: 204 });
      break;
    default:
      throw new Error('Method not allowed');
  }
};

const mockRejectedValueOnce = ({ method = 'get', responseData = {} }) => {
  switch (method) {
    case 'get':
      axios.get.mockRejectedValueOnce(responseData);
      break;
    case 'post':
      axios.post.mockRejectedValueOnce(responseData);
      break;
    case 'put':
      axios.put.mockRejectedValueOnce(responseData);
      break;
    case 'delete':
      axios.delete.mockRejectedValueOnce(responseData);
      break;
    default:
      throw new Error('Method not allowed');
  }
};

const shouldHaveBeenCalledTimes = ({ method = 'get', times = 0 }) => {
  switch (method) {
    case 'get':
      expect(axios.get).toHaveBeenCalledTimes(times);
      break;
    case 'post':
      expect(axios.post).toHaveBeenCalledTimes(times);
      break;
    case 'put':
      expect(axios.put).toHaveBeenCalledTimes(times);
      break;
    case 'delete':
      expect(axios.delete).toHaveBeenCalledTimes(times);
      break;
    default:
      throw new Error('Method not allowed');
  }
};

export {
  mockResolvedValueOnce,
  mockRejectedValueOnce,
  shouldHaveBeenCalledTimes,
};
