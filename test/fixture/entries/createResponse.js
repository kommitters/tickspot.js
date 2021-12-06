import responseGenerator from '../responseGenerator.js';
import dataEntryCreate from './dataEntries.js';

const dataSuccessful = {
  data: {
    id: 99547865,
    date: '2021-11-08',
    hours: 2,
    notes: 'Issue',
    task_id: 14521973,
    user_id: 377264,
    url: 'https://secure.tickspot.com/114217/api/v2/entries.json',
    created_at: '2021-11-09T11:30:40.000-05:00',
    updated_at: '2021-11-09T11:30:40.000-05:00',
  },
};
const Url = 'https://www.tickspot.com/114217/api/v2/entries.json';
const messageTimeMissed = { errors: { hours: [] } };
const auth = 'Token token=12345akeu785asd45ac48';
const requiredData = { ...dataEntryCreate };
const dataEntryMissed = { ...dataEntryCreate, hours: null };

const createEntriesResponse = (
  responseGenerator(Url, 201, 'Created', 'post', requiredData, dataSuccessful, auth)
);
const createEntriesError = {
  response:
    responseGenerator(Url, 401, 'Bad credentials or user agent', 'post', requiredData, '', null),
};
const createEntriesMissedData = {
  response:
    responseGenerator(Url, 422, 'Unprocessable Entity',
      'post', dataEntryMissed, messageTimeMissed, auth),
};

export { createEntriesResponse, createEntriesError, createEntriesMissedData };
