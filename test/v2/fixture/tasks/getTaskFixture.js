const getTaskFixture = {
  id: 123456,
  name: 'Software Development',
  budget: null,
  position: 1,
  project_id: 1,
  date_closed: null,
  billable: false,
  created_at: '2020-04-21T16:06:53.000-04:00',
  updated_at: '2022-01-17T17:51:25.000-05:00',
  total_hours: 1860.192,
  entries: {
    count: 932,
    url: 'https://secure.tickspot.com/654321/api/v2/tasks/123456/entries.json',
    updated_at: '2021-12-16T16:11:14.000-05:00',
  },
  project: {
    id: 1,
    name: 'Internal Projects',
    budget: null,
    date_closed: null,
    notifications: false,
    billable: false,
    recurring: false,
    client_id: 365968,
    owner_id: 324080,
    url: 'https://secure.tickspot.com/654321/api/v2/projects/1.json',
    created_at: '2020-04-21T16:06:53.000-04:00',
    updated_at: '2022-02-10T19:22:45.000-05:00',
  },
};

export default getTaskFixture;
