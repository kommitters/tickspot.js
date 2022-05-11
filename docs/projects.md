# Projects

This module allows you to interact with the Tickspot projects.

- [List Opened Projects](#list-opened-projects)
- [List Closed Projects](#list-closed-projects)
- [Get Project](#get-project)
- [Create Project](#create-project)
- [Update Project](#update-project)
- [Delete Project](#delete-project)
- [List Project Entries](#list-project-entries)
- [List Project Opened Tasks](#list-project-opened-tasks)
- [List Project Closed Tasks](#list-project-closed-tasks)

## List Opened Projects

This method will return all opened projects. This method needs the following params:

- [Required] page, parameter for your request.

```javascript
const result = await client.projects.listOpened(1);

// The result would be something like the following:
[
  {
    id: 16,
    name: "Project #1",
    budget: null,
    date_closed: null,
    notifications: false,
    billable: true,
    recurring: false,
    client_id: 987654,
    owner_id: 123987,
    url: "https://secure.tickspot.com/654321/api/v2/projects/16.json",
    created_at: "2020-04-21T12:35:46.000-04:00",
    updated_at: "2022-02-14T16:30:15.000-05:00",
  },
  {
    id: 4,
    name: "Project #2",
    budget: null,
    date_closed: null,
    notifications: false,
    billable: true,
    recurring: false,
    client_id: 987654,
    owner_id: 123987,
    url: "https://secure.tickspot.com/654321/api/v2/projects/4.json",
    created_at: "2020-04-21T15:56:06.000-04:00",
    updated_at: "2022-02-14T13:30:06.000-05:00",
  },
];
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript

const callback = (responseData) => {
  responseData.map((project) => {
    return {
      name: project.name,
    };
  });
};

const result = await client.projects.listOpened(1, callback);

// The result would be something like the following:
[
  { name: 'Project #1' },
  { name: 'Project #2' },
  { name: 'Project #3' },
  ...
]
```

## List Closed Projects

This method will return all closed projects. This method needs the following params:

- [Required] page, parameter for your request.

```javascript
const result = await client.projects.listClosed(1);

// The result would be something like the following:
[
  {
    id: 16,
    name: "Project #1",
    budget: null,
    date_closed: '2022-01-21',
    notifications: false,
    billable: true,
    recurring: false,
    client_id: 987654,
    owner_id: 123987,
    url: "https://secure.tickspot.com/654321/api/v2/projects/16.json",
    created_at: "2020-04-21T12:35:46.000-04:00",
    updated_at: "2022-02-14T16:30:15.000-05:00",
  },
  ...
];
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript

const callback = (responseData) => {
  responseData.map((project) => {
    return {
      name: project.name,
      dateClosed: project.date_closed,
    };
  });
};

const result = await client.projects.listClosed(1, callback);

// The result would be something like the following:
[
  { name: 'Project #1', dateClosed: '2019-03-04' },
  { name: 'Project #2', dateClosed: '2019-03-14' },
  ...
]
```

## Get Project

This method will return the specified project info. This method needs the following params:

- [Required] projectId, project unique identificator.

```javascript
const result = await client.projects.getProject(16);
// The result would be something like the following:
[
  {
    id: 16,
    name: "Build Death Star",
    budget: 150.0,
    date_closed: null,
    notifications: false,
    billable: true,
    recurring: false,
    client_id: 12,
    owner_id: 3,
    url: "https://www.tickspot.com/api/v2/123/projects/16.json",
    created_at: "2014-09-09T13:36:20.000-04:00",
    updated_at: "2014-09-09T13:36:20.000-04:00",
    total_hours: 22.0,
    tasks: {
      count: 1,
      url: "https://www.tickspot.com/api/v2/123/projects/16/tasks.json",
      updated_at: null,
    },
    client: {
      id: 12,
      name: "Empire",
      archive: false,
      url: "https://www.tickspot.com/api/v2/123/clients/12.json",
      updated_at: "2014-09-15T10:32:46.000-04:00",
    },
  },
];
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    id: responseData.id,
  };
};

const result = await client.projects.getProject(16, callback);
// The result would be something like the following:
{
  id: 16;
}
```

## Create Project

This method will create a new project from the parameters passed. No tasks will be created. Time entries will not be allowed until at least one task is created. It is strictly limited to administrators

This method will return the new project info. This method needs the following params:

- [Required] name, name of the project
- [Required] clientId, related to the client
- [Required] ownerId, owner of the project
- [Optional] budget.
- [Optional] notifications.
- [Optional] billable.
- [Optional] recurring.

```javascript
const data = {
  name: 'test #1',
  clientId: 123456,
  ownerId: 654321,
  budget: 50.0,
  notifications: false,
  billable: false,
  recurring: false,
};

const result = await client.projects.create(data);

// The result would be something like the following:
{
  id: 123,
  name: 'test #1',
  budget: 50,
  date_closed: null,
  notifications: false,
  billable: false,
  recurring: false,
  client_id: 365968,
  owner_id: 337683,
  url: 'https://secure.tickspot.com/654321/api/v2/projects/123.json',
  created_at: '2022-03-08T17:29:02.000-05:00',
  updated_at: '2022-03-08T17:29:02.000-05:00'
}
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    name: responseData.name,
    budget: responseData.budget
  };
};

const data = {
  name: 'test #1',
  clientId: 123456,
  ownerId: 654321,
  budget: 50.0,
  notifications: false,
  billable: false,
  recurring: false,
};

const result = await client.projects.create(data, callback);

// The result would be something like the following:
{ name: 'test #1', budget: 50 }
```

## Update Project

This method will update a specific project from the parameters passed and return the project info. This method needs the following params:

- [Required] projectId, project unique identificator.
- [Optional] name, name of the project
- [Optional] clientId, related to the client
- [Optional] ownerId, owner of the project
- [Optional] budget.
- [Optional] notifications.
- [Optional] billable.
- [Optional] recurring.

```javascript
const data = {
  projectId: 2210008,
  name: 'test #1',
  client_id: 654321,
  ownerId: 123456,
  budget: 40.0,
  notifications: false,
  billable: false,
  recurring: false,
};

const result = await client.projects.update(data);
// The result would be something like the following:
{
  id: 2210008,
  name: 'test #1',
  budget: 40,
  date_closed: null,
  notifications: false,
  billable: false,
  recurring: false,
  client_id: 654321,
  owner_id: 123456,
  url: 'https://secure.tickspot.com/987654/api/v2/projects/2210008.json',
  created_at: '2022-03-13T10:19:12.000-04:00',
  updated_at: '2022-03-13T10:36:20.000-04:00'
}
```

Optionally, you can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    name: responseData.name,
    budget: responseData.budget
  };
};

const data = {
  projectId: 2210008,
  name: 'test #1',
  client_id: 654321,
  ownerId: 123456,
  budget: 40.0,
  notifications: false,
  billable: false,
  recurring: false,
};

const result = await client.projects.update(data, callback);
// The result would be something like the following:
{ name: 'test #1', budget: 40 }
```

## Delete Project

This method will delete a specific project. The params you can send are the following:

- [Required] projectId, the project unique identificator.

**Warning**: The project and all time entries will be immediately deleted

```javascript
const result = await client.projects.delete(123456);

// The result will be true if the project was deleted
```

## List Project Entries

This will return all entries that are related to a specific project and meet the provided parameters. You can send some params to filter the response, those params are the following:

- [Required] startDate. The format is: 'YYYY-MM-DD'.
- [Required] endDate. The format is: 'YYYY-MM-DD'.
- [Required] projectId, related parent project.
- [Optional] userId, will be ignored if the user is not an administrator.
- [Optional] billable.
- [Optional] billed.

This method returns a promise with the response data from the tickspot API.

```javascript
const params = {
  projectId: 123,
  startDate: "2021-11-08",
  endDate: "2021-11-09",
  billable: true,
};

const result = await client.projects.listEntries(params);
// The result would be something like the following:
[
  {
    id: 1,
    date: "2014-09-17",
    hours: 2.88,
    notes: "Example Entry.",
    task_id: 123,
    user_id: 4,
    url: "https://www.tickspot.com/api/v2/123/entries/1.json",
    created_at: "2021-11-08T15:03:19.000-04:00",
    updated_at: "2021-11-08T15:03:19.000-04:00"
  },
  ...
]
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const params = {
  projectId: 123,
  startDate: "2021-11-08",
  endDate: "2021-11-09",
};

const callback = (responseData) =>
  responseData.map((entry) => {
    const date = new Date(entry.date);
    return {
      id: entry.id,
      notes: entry.notes,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });

const result = await client.projects.listEntries(params, callback);
// The result would be something like the following:
[
  {
    id: 1,
    notes: 'Example Entry.',
    day: 08,
    month: 11,
    year: 2021
  }
  ...
]
```

## List Project Opened Tasks

This method will return all opened tasks for the project. This method needs the following params:

- [Required] projectId, project unique identificator.

```javascript
const result = await client.projects.listOpenedTasks(16);
// The result would be something like the following:
[
  {
    id: 123456,
    name: 'Task #1',
    budget: null,
    position: 1,
    project_id: 16,
    date_closed: null,
    billable: false,
    url: 'https://secure.tickspot.com/16/api/v2/tasks/123456.json',
    created_at: '2020-04-21T16:06:53.000-04:00',
    updated_at: '2022-01-17T17:51:25.000-05:00'
  },
  {

  },
  ...
]
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  responseData.map((task) => {
    return {
      id: task.id,
      name: task.name,
    };
  });
};

const result = await client.projects.listOpenedTasks(16, callback);
// The result would be something like the following:
[
  { id: 123456, name: 'Task #1' },
  { id: 654321, name: 'Task #2' },
  ...
]
```

## List Project Closed Tasks

This method will return all closed tasks for the project. This method needs the following params:

- [Required] projectId, project unique identificator.

```javascript
const result = await client.projects.listClosedTasks(16);
// The result would be something like the following:
[
  {
    id: 123456,
    name: 'Task #1',
    budget: null,
    position: 1,
    project_id: 16,
    date_closed: '2022-01-20',
    billable: false,
    url: 'https://secure.tickspot.com/16/api/v2/tasks/123456.json',
    created_at: '2020-04-21T16:06:53.000-04:00',
    updated_at: '2022-01-17T17:51:25.000-05:00'
  },
  {

  },
  ...
]
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  responseData.map((task) => {
    const date = new Date(task.date_closed);
    return {
      id: task.id,
      name: task.name,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });
};

const result = await client.projects.listClosedTasks(16, callback);
// The result would be something like the following:
[
  { id: 123456, name: 'Task #1', day: 19, month: 0, year: 2022 },
  ...
]
```
