import responseGenerator from './responseGenerator.js';
import dataEntry from './dataEntryCreateEntry.js';

const dataSuccessful = {
  data: {
    id: 2234825443,
    wid: 5791728,
    pid: 275808300,
    billable: false,
    start: '2013-03-05T07:58:58.000Z',
    stop: '2013-03-05T08:18:58Z',
    duration: 1200,
    description: 'Meeting with possible clients',
    tags: [Array],
    duronly: false,
    at: '2021-11-01T21:26:36+00:00',
    uid: 7320985,
  },
};
const messageTimeMissed = "duration can't be blank";
const auth = 'Basic Hdjeu3849274hdbcyruayr137udschs7';
const requiredData = { timeEntry: dataEntry };
const dataEntryMissed = { ...dataEntry, duration: null };

const togglCreateEntriesResponse = (
  responseGenerator(200, 'OK', 'post', requiredData, dataSuccessful, auth)
);
const togglCreateEntriesError = {
  response: responseGenerator(403, 'Forbidden', 'post', requiredData, '', null),
};
const toogglCreateEntriesMissedData = {
  response: responseGenerator(400, 'Bad Request', 'post', dataEntryMissed, messageTimeMissed, auth),
};

export { togglCreateEntriesResponse, togglCreateEntriesError, toogglCreateEntriesMissedData };
