export const dataSuccessful = {
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

export const dataEntrySuccessful = {
  data: {
    id: 123456,
    date: '2021-12-29',
    hours: 2,
    notes: 'Test Tickspot #1',
    task_id: 14541973,
    user_id: 337683,
    url: 'https://secure.tickspot.com/114217/api/v2/entries/123456.json',
    created_at: '2021-12-29T13:26:03.000-05:00',
    updated_at: '2021-12-29T13:26:03.000-05:00',
    task: {
      id: 14541973,
      name: '[OpenSource] Software Development',
      budget: null,
      position: 12,
      project_id: 1957454,
      date_closed: null,
      billable: false,
      url: 'https://secure.tickspot.com/114217/api/v2/tasks/14541973.json',
      created_at: '2020-04-21T18:49:17.000-04:00',
      updated_at: '2021-12-29T13:34:11.000-05:00',
    },
  },
};

export const dataEntryNotFound = {
  data: {
    status: 404,
    statusText: 'Not Found',
  },
};

export default { dataSuccessful, dataEntrySuccessful, dataEntryNotFound };
