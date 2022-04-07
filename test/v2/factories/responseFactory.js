import responseGenerator from './responseGenerator.js';

const messageTimeMissed = { errors: 'field is missing' };
const auth = 'Token token=12345akeu785asd45ac48';

const responseFactory = ({
  requestData, responseType, responseData, URL, method = 'get',
}) => {
  switch (responseType) {
    case 'successful':
      return responseGenerator(URL, 200, 'OK',
        method, requestData, responseData, auth);

    case 'created':
      return responseGenerator(URL, 201, 'Created',
        'post', requestData, responseData, auth);

    case 'successfulNoContent':
      return responseGenerator(URL, 204, 'No Content',
        method, requestData, responseData, auth);

    case 'authenticationError':
      return {
        response:
          responseGenerator(URL, 401, 'Bad credentials or user agent',
            'post', requestData, 'authenticationError', null),
      };

    case 'notFound':
      return {
        response: responseGenerator(URL, 404, 'Not Found',
          method, requestData, responseData, auth),
      };

    case 'unprocessableEntity':
      return {
        response:
          responseGenerator(URL, 422, 'Unprocessable Entity',
            method, requestData, messageTimeMissed, auth),
      };

    case 'notAcceptable':
      return {
        response: responseGenerator(URL, 406, 'Not Acceptable',
          method, requestData, responseData, auth),
      };

    default:
      throw new Error('responseType is missing');
  }
};

export default responseFactory;
