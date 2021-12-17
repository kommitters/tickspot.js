import responseGenerator from '../responseGenerator.js';
import dataSuccessful from './responseData.js';

const Url = 'https://www.tickspot.com/114217/api/v2/entries.json';
const messageTimeMissed = { errors: 'field is missing' };
const auth = 'Token token=12345akeu785asd45ac48';

const createResponse = (dataEntry, responseType) => {
  if (responseType === 'succesful') {
    return responseGenerator(Url, 201, 'Created', 'post', dataEntry, dataSuccessful, auth);
  }
  if (responseType === 'authenticationError') {
    return {
      response:
        responseGenerator(Url, 401, 'Bad credentials or user agent', 'post', dataEntry, '', null),
    };
  }
  if (responseType === 'dataMissedError') {
    return {
      response:
        responseGenerator(Url, 422, 'Unprocessable Entity',
          'post', dataEntry, messageTimeMissed, auth),
    };
  }

  throw new Error('responseType is missing');
};

export default createResponse;
