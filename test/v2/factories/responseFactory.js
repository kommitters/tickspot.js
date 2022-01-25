import responseGenerator from './responseGenerator.js';

const messageTimeMissed = { errors: 'field is missing' };
const auth = 'Token token=12345akeu785asd45ac48';

const responseFactory = (requestData, responseType, apiResponseData, url, method = 'get') => {
  switch (responseType) {
    case 'successful':
      return responseGenerator(url, 200, 'OK',
        method, requestData, apiResponseData, auth);

    case 'created':
      return responseGenerator(url, 201, 'Created',
        'post', requestData, apiResponseData, auth);

    case 'successfulNoContent':
      return responseGenerator(url, 204, 'No Content',
        method, requestData, apiResponseData, auth);

    case 'authenticationError':
      return {
        response:
          responseGenerator(url, 401, 'Bad credentials or user agent',
            'post', requestData, 'authenticationError', null),
      };

    case 'notFound':
      return responseGenerator(url, 404, 'Not Found',
        method, requestData, apiResponseData, auth);

    case 'dataMissedError':
      return {
        response:
          responseGenerator(url, 422, 'Unprocessable Entity',
            method, requestData, messageTimeMissed, auth),
      };

    default:
      throw new Error('responseType is missing');
  }
};

export default responseFactory;
