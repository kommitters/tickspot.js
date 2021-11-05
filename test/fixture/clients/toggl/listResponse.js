import responseGenerator from './responseGenerator.js';

const dataSuccessful = [
  {
    id: 5539418734,
    guid: 'g55759550gy1c18f32620d9beyt88511',
    wid: 8573648,
    pid: 175738645,
    billable: false,
    start: '2021-10-20T20:05:34+00:00',
    stop: '2021-10-20T21:06:12+00:00',
    duration: 3638,
    description: 'Test',
    duronly: false,
    at: '2021-10-20T20:06:28+00:00',
    uid: 7320352,
  },
];
const auth = 'Basic Hdjeu3849274hdbcyruayr137udschs7';
const togglGetEntriesResponse = responseGenerator(200, 'OK', 'get', null, dataSuccessful, auth);
const togglGetEntriesError = {
  response: responseGenerator(403, 'Forbidden', 'get', null, '', null),
};

export { togglGetEntriesResponse, togglGetEntriesError };
