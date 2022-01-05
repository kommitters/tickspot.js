import responseGenerator from '../responseGenerator.js';
import { dataSuccessful, dataEntrySuccessful, dataEntryNotFound } from './responseData.js';

const Url = 'https://www.tickspot.com/114217/api/v2/entries.json';
const getEntryUrl = 'https://www.tickspot.com/114217/api/v2/entries/123456.json';
const messageTimeMissed = { errors: 'field is missing' };
const auth = 'Token token=12345akeu785asd45ac48';

const createResponse = (dataEntry, responseType) => {
  switch (responseType) {
    case 'succesful':
      return responseGenerator(Url, 201, 'Created', 'post', dataEntry, dataSuccessful, auth);

    case 'getEntrySuccesful':
      return responseGenerator(getEntryUrl, 200, 'OK',
        'get', dataEntry, dataEntrySuccessful, auth);

    case 'getEntryNotFound':
      return responseGenerator(getEntryUrl, 404, 'Not Found',
        'get', dataEntry, dataEntryNotFound, auth);

    case 'authenticationError':
      return {
        response:
          responseGenerator(Url, 401, 'Bad credentials or user agent', 'post', dataEntry, '', null),
      };

    case 'dataMissedError':
      return {
        response:
          responseGenerator(Url, 422, 'Unprocessable Entity',
            'post', dataEntry, messageTimeMissed, auth),
      };

    default:
      throw new Error('responseType is missing');
  }
};

export default createResponse;
