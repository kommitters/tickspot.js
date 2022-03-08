const getProjectFixture = [
  {
    id: 16,
    name: 'Build Death Star',
    budget: 150.0,
    date_closed: null,
    notifications: false,
    billable: true,
    recurring: false,
    client_id: 12,
    owner_id: 3,
    url: 'https://www.tickspot.com/api/v2/123/projects/16.json',
    created_at: '2014-09-09T13:36:20.000-04:00',
    updated_at: '2014-09-09T13:36:20.000-04:00',
    total_hours: 22.0,
    tasks:
      {
        count: 1,
        url: 'https://www.tickspot.com/api/v2/123/projects/16/tasks.json',
        updated_at: null,
      },
    client:
      {
        id: 12,
        name: 'Empire',
        archive: false,
        url: 'https://www.tickspot.com/api/v2/123/clients/12.json',
        updated_at: '2014-09-15T10:32:46.000-04:00',
      },
  },
];

export default getProjectFixture;
