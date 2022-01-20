import responseGenerator from './responseGenerator.js';

const messageTimeMissed = { errors: 'field is missing' };
const auth = 'Token token=12345akeu785asd45ac48';

const responseFactory = (dataEntry, responseType, apiResponseData, url) => {
  switch (responseType) {
    case 'create':
      return responseGenerator(url, 201, 'Created',
        'post', dataEntry, apiResponseData, auth);

    case 'succesful':
      return responseGenerator(url, 200, 'OK',
        'get', dataEntry, apiResponseData, auth);

    case 'notFound':
      return responseGenerator(url, 404, 'Not Found',
        'get', dataEntry, apiResponseData, auth);

    case 'authenticationError':
      return {
        response:
          responseGenerator(url, 401, 'Bad credentials or user agent',
            'post', dataEntry, '', null),
      };

    case 'dataMissedError':
      return {
        response:
          responseGenerator(url, 422, 'Unprocessable Entity',
            'post', dataEntry, messageTimeMissed, auth),
      };

    default:
      throw new Error('responseType is missing');
  }
};

export default responseFactory;
