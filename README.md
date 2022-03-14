# Tickspot.js

Tickspot.js is a Node.js client for [tickspot api](https://github.com/tick/tick-api).

## Installation

Get the package via npm

```shell
$ npm i tickspot.js
```

## Usage

To use tickspot.js client, just import the tickspot module as following:

```javascript
import tickspot from "tickspot.js";
```

Once the module is imported, create an instance using the `tickspot` function. This function will require the following data:

- `apiVersion` - This is version of the Tick API.
- `subscriptionId` and `apiToken` - Those are unique data that you will find in your Tickspot profile.
- `agentEmail` - Your email.

```javascript
const client = tickspot({
  apiVersion: 2,
  subscriptionId: "subscriptionId",
  apiToken: "apiToken",
  agentEmail: "agentEmail",
});
```

### Entries

This module allows you to interact with the Tickspot entries.

#### List Entries

This will return all time entries that meet the provided parameters. You can send some params to filter the response, those params are the following:

- [Required] startDate. The format is: 'YYYY-MM-DD'.
- [Required] endDate. The format is: 'YYYY-MM-DD'.
- [Optional] userId, will be ignored if the user is not an administrator.
- [Optional] taskId, related parent task.
- [Optional] userId, will be ignored if the user is not an administrator.
- [Optional] billable.
- [Optional] billed.

This method returns a promise with the response data from the tickspot API.

```javascript
const params = {
  startDate: "2021-11-08",
  endDate: "2021-11-09",
  billable: true,
};

const result = await client.entries.list(params);

// The result would be something like the following:
[
  {
    id: 1,
    date: "2014-09-17",
    hours: 2.88,
    notes: "Example Entry.",
    task_id: 24,
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

const result = await client.entries.list(params, callback);
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

#### Get Entry

This will return the specified entry info. This method needs the following params:

- [Required] entryId, entry unique identificator.

```javascript
const result = await client.entries.getEntry(1);

// The result would be something like the following:
{
  id: 1,
  date: '2021-11-08',
  hours: 0.5,
  notes: 'Example Task',
  task_id: 1,
  user_id: 1,
  url: 'https://secure.tickspot.com/123/api/v2/entries/1.json',
  created_at: '2021-11-08T08:46:26.000-05:00',
  updated_at: '2021-11-08T08:46:26.000-05:00',
  task: {
    id: 1,
    name: '2 - Development',
    budget: null,
    position: 2,
    project_id: 1,
    date_closed: null,
    billable: true,
    url: 'https://secure.tickspot.com/123/api/v2/tasks/1.json',
    created_at: '2020-04-21T12:39:39.000-04:00',
    updated_at: '2022-02-07T17:21:51.000-05:00'
  }
}

```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  const date = new Date(responseData.date);
  return {
    id: responseData.id,
    notes: responseData.notes,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

const result = await client.entries.getEntry(1, callback);

// The result would be something like the following:
{
  id: 1,
  notes: 'Example Task.',
  day: 8,
  month: 11,
  year: 2021
}

```

#### Create an Entry

This method allows you to create a new entry on tickspot. The params you can send are the following:

- [Required] taskId, parent task related.
- [Optional] date, if not sent it will take the current date. The format is: 'YYYY-MM-DD'.
- [Required] hours, time spent on this entry.
- [Optional] notes, entry description.
- [Optional] userId, will be ignored if the user is not an administrator.

The create method returns a promise with the response data from the tickspot API.

```javascript
const data = {
  date: "2021-11-08",
  hours: 2,
  notes: "Entry description",
  taskId: 12345678,
};

const result = await client.entries.create(data);

// The result would be something like the following:
{
  date: "2021-11-08",
  hours: 1.5,
  notes: "Entry description",
  task_id: 12345678,
  user_id: 1,
  created_at: '2021-11-08T17:40:11.000-05:00',
  updated_at: '2021-11-08T17:41:00.000-05:00'
}
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const data = {
  date: "2021-12-01",
  hours: 2,
  notes: "Entry description",
  taskId: 12345678,
};

const callback = (responseData) => {
  const date = new Date(responseData.date);
  return {
    entryDate: {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    },
  };
};

const result = await client.entries.create(data, callback);

// The result would be something like the following:
{
  entryDate: {
    day: 08,
    moth: 11,
    year: 2021
  }
}
```

#### Update Entry

This method will update the entry information from the parameters passed. The params you can send are the following:

- [Required] entryId, entry unique identificator.
- [Optional] date, it does not allow update to future dates. The format is: 'YYYY-MM-DD'.
- [Optional] hours, time spent on this entry.
- [Optional] notes, entry description.
- [Optional] taskId, related parent task.
- [Optional] userId, will be ignored if the user is not an administrator.
- [Optional] billable.
- [Optional] billed. If it is true, the entry will be blocked

```javascript
const data = {
  entryId: 1,
  date: "2022-01-22",
  hours: 1,
  notes: "Update entry test",
  taskId: 12345678,
  userId: 2,
  billed: true,
};

const result = await client.entries.updateEntry(data);

// The result would be something like the following:
{
  id: 1,
  date: '2022-01-22',
  hours: 1,
  notes: 'Update entry test',
  task_id: 12345678,
  user_id: 2,
  url: 'https://secure.tickspot.com/123/api/v2/entries/1.json',
  created_at: '2022-02-07T17:40:11.000-05:00',
  updated_at: '2022-02-07T17:41:00.000-05:00'
}
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  const date = new Date(responseData.date);
  return {
    id: responseData.id,
    notes: responseData.notes,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

const data = {
  entryId: "101152129",
  date: "2022-01-20",
  hours: 1,
  notes: "Update entry test",
  taskId: 14541850,
  userId: 337683,
  billed: true,
};

const result = await client.entries.updateEntry(data, callback);
// The result would be something like the following:
{
  id: 1,
  notes: 'Update entry test',
  day: 22,
  moth: 1,
  year: 2022,
}
```

#### Delete Entry

This method will delete the entry. The params you can send are the following:

- [Required] entryId, entry unique identificator.

```javascript
const result = await client.entries.deleteEntry("100773532");

// The result will be true if task was deleted
```

### Tasks

This module allows you to interact with the Tickspot tasks.

#### List Closed Tasks

This method will return all closed tasks across all projects.

```javascript
const result = await client.tasks.listClosed();

// The result would be something like the following:
[
  {
    id: 1,
    name: "Example Task",
    budget: 14.0,
    position: 1,
    project_id: 16,
    date_closed: "2021-11-08",
    billable: true,
    url: "https://www.tickspot.com/api/v2/123/tasks/1.json",
    created_at: "2021-11-08T15:03:18.000-04:00",
    updated_at: "2021-11-08T15:03:18.000-04:00"
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
      budget: task.budget,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });
};

const result = await client.tasks.listClosed(callback);

// The result would be something like the following:
[
  {
    id: 1,
    name: "Example Task",
    budget: "$14.0",
    day: 08,
    month: 11,
    year: 2021
  },
  ...
]
```

#### List All Opened Tasks

This method will return all opened tasks across all projects.

```javascript
const result = await client.tasks.listOpened();

// The result would be something like the following:
[
  {
    id: 25,
    name: "Software Development",
    budget: 14.0,
    position: 1,
    project_id: 16,
    date_closed: null,
    billable: false,
    url:"https://www.tickspot.com/api/v2/123/tasks/25.json",
    created_at:"2014-09-18T15:03:18.000-04:00",
    updated_at:"2014-09-18T15:03:18.000-04:00"
  }
  ...
]
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  responseData.map((task) => {
    const date = new Date(task.created_at);
    return {
      id: task.id,
      name: task.name,
      budget: task.budget,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });
};

const result = await client.tasks.listOpened(callback);

// The result would be something like the following:
[
  {
    id: 25,
    name: "Software Development",
    budget: 14.0,
    day: 08,
    month: 11,
    year: 2021
  },
  ...
]
```

#### Create Task

This method will create a new task from the parameters passed. The params you can send are the following:

- [Required] name, task name.
- [Required] projectId, project unique identificator.
- [Optional] budget.
- [Optional] billable.
- [Optional] dateClosed, the format is: 'YYYY-MM-DD'.

```javascript
const data = {
  name: 'New task test',
  projectId: 7890,
  budget: null,
  billable: false,
  dateClosed: '2022-01-20',
};
const result = await client.tasks.create(data);
// The result would be something like the following:
{
  id: 123456,
  name: 'New task test',
  budget: null,
  position: 25,
  project_id: 7890,
  date_closed: '2022-01-20',
  billable: false,
  url: 'https://secure.tickspot.com/7890/api/v2/tasks/123456.json',
  created_at: '2022-02-08T20:41:50.000-05:00',
  updated_at: '2022-02-08T20:41:50.000-05:00',
}
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    id: responseData.id,
    name: responseData.name,
    billable: responseData.billable,
  };
};
const data = {
  name: 'New task test',
  projectId: 7890,
  budget: null,
  billable: false,
  dateClosed: '2022-01-20',
};
const result = await client.tasks.create(data, callback);
// The result would be something like the following:
{
  id: 1,
  name: 'New task test',
  billable: false,
}
```

#### Update Task

This method will update the task information from the parameters passed. The params you can send are the following:

- [Required] taskId, task unique identificator.
- [Required] budget, it is allowed to update this value to null.
- [Optional] billable.
- [Optional] name, task name.
- [Optional] position.
- [Optional] projectId, project unique identificator.
- [Optional] dateClosed, the format is: 'YYYY-MM-DD'.

```javascript
const data = {
  taskId: 123456,
  budget: null,
  billable: false,
  name: 'Update task test',
  position: 25,
  projectId: 7890,
  dateClosed: '2022-01-20',
};
const result = await client.tasks.update(data);
// The result would be something like the following:
{
  id: 123456,
  name: 'Update task test',
  budget: null,
  position: 25,
  project_id: 7890,
  date_closed: '2022-01-20',
  billable: false,
  url: 'https://secure.tickspot.com/7890/api/v2/tasks/123456.json',
  created_at: '2022-02-08T20:41:50.000-05:00',
  updated_at: '2022-02-08T20:41:50.000-05:00',
}
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    id: responseData.id,
    name: responseData.name,
    billable: responseData.billable,
  };
};
const data = {
  taskId: 123456,
  budget: null,
  billable: false,
  name: 'Update task test',
  position: 25,
  projectId: 7890,
  dateClosed: '2022-01-20',
};
const result = await client.tasks.update(data, callback);
// The result would be something like the following:
{
  id: 1,
  name: 'Update task test',
  billable: false,
}
```

#### Get Single Task

This method will return the specified task. This method needs the following params:

- [Required] taskId, task unique identificator.

```javascript
const result = await client.tasks.getTask(1);

// The result would be something like the following:
{
  id: 1,
  name: 'Software Development',
  budget: null,
  position: 1,
  project_id: 2,
  date_closed: null,
  billable: false,
  created_at: '2020-04-21T16:06:53.000-04:00',
  updated_at: '2022-01-17T17:51:25.000-05:00',
  total_hours: 1860.192,
  entries: {
    count: 932,
    url: 'https://secure.tickspot.com/654321/api/v2/tasks/14541833/entries.json',
    updated_at: '2021-12-16T16:11:14.000-05:00'
  },
  project: {
    id: 2,
    name: 'Internal Projects',
    budget: null,
    date_closed: null,
    notifications: false,
    billable: false,
    recurring: false,
    client_id: 365968,
    owner_id: 324080,
    url: 'https://secure.tickspot.com/654321/api/v2/projects/2.json',
    created_at: '2020-04-21T16:06:53.000-04:00',
    updated_at: '2022-02-10T19:22:45.000-05:00'
  }
}

```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  const date = new Date(responseData.created_at);
  return {
    id: responseData.id,
    name: responseData.name,
    projectName: responseData.project.name,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

const result = await client.tasks.getTask(1, callback);

// The result would be something like the following:
{
  id: 1,
  name: 'Software Development',
  projectName: 'Internal Projects',
  day: 21,
  month: 3,
  year: 2020
}
```

#### List Task Entries

This will return all entries that are related to a specific task and meet the provided parameters. You can send some params to filter the response, those params are the following:

- [Required] taskId, related parent task.
- [Required] startDate. The format is: 'YYYY-MM-DD'.
- [Required] endDate. The format is: 'YYYY-MM-DD'.
- [Optional] userId, will be ignored if the user is not an administrator.
- [Optional] billable.
- [Optional] billed.

This method returns a promise with the response data from the tickspot API.

```javascript
const params = {
  taskId: 123,
  startDate: "2021-11-08",
  endDate: "2021-11-09",
  billable: true,
};
const result = await client.tasks.listEntries(params);
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
  taskId: 123,
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

const result = await client.tasks.listEntries(params, callback);
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

### Projects

This module allows you to interact with the Tickspot projects.

#### Create Project

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

#### Update Project

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

const result = await client.projects.updateProject(data);
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

const result = await client.projects.updateProject(data, callback);
// The result would be something like the following:
{ name: 'test #1', budget: 40 }
````
#### List All Opened Projects

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

#### List Closed Projects

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

#### List Project Entries

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

#### Get Project

This method will return the specified project info. This method needs the following params:

- [Required] projectId, project unique identificator.

```javascript
const result = await client.projects.getProject(16);
// The result would be something like the following:
[
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
{ id: 16 }
```

### Users

This module allows you to interact with the Tickspot users.

#### List Users

This method will return information about the users on the subscription. Non-administrators will only have visibility of themselves, while administrators will see everyone.

```javascript
const result = await client.users.list();

// The result would be something like the following:
[
  {
    id: 4,
    first_name: "Anakin",
    last_name: "Skywalker",
    email: "user@tickspot.com",
    timezone: "Hawaii",
    updated_at: "2014-11-19T12:53:46.000-05:00",
  },
  {
    id: 1,
    first_name: "Luke",
    last_name: "Skywalker",
    email: "owner@tickspot.com",
    timezone: "Hawaii",
    updated_at: "2015-01-30T15:13:44.000-05:00",
  },
];
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) =>
  responseData.map((user) => {
    return {
      id: user.id,
      name: user.first_name,
      email: user.email,
    };
  });

const result = await client.users.list(callback);
// The result would be something like the following:
[
  {
    id: 4,
    name: "Anakin",
    email: "user@tickspot.com",
  },
  {
    id: 1,
    name: "Luke",
    email: "owner@tickspot.com",
  },
];
```

#### List Deleted Users

This method will return users who have been deleted from the subscription and have time entries. Non-administrators will not have access.

```javascript
const result = await client.users.listDeleted();

// The result would be something like the following:
[
  {
    id: 5,
    first_name: "Darth",
    last_name: "Vader",
    email: "dv@tickspot.com",
    timezone: "Death Star",
    updated_at: "2014-11-19T12:53:46.000-05:00",
  },
];
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) =>
  responseData.map((user) => {
    return {
      id: user.id,
      name: user.first_name,
      email: user.email,
    };
  });

const result = await client.users.listDeleted(callback);
// The result would be something like the following:
[
  {
    id: 5,
    naem: "Darth",
    email: "dv@tickspot.com",
  },
];
```

#### List User Entries

This will return all entries that are related to a specific user and meet the provided parameters. You can send some params to filter the response, those params are the following:

- [Required] userId, will be ignored if the user is not an administrator.
- [Required] startDate. The format is: 'YYYY-MM-DD'.
- [Required] endDate. The format is: 'YYYY-MM-DD'.
- [Optional] taskId, related parent task.
- [Optional] billable.
- [Optional] billed.

This method returns a promise with the response data from the tickspot API.

```javascript
const params = {
  userId: 123,
  startDate: "2021-11-08",
  endDate: "2021-11-09",
  billable: true,
};
const result = await client.users.listEntries(params);
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
  userId: 123,
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
const result = await client.users.listEntries(params, callback);
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

## Code of conduct

We welcome everyone to contribute. Make sure you have read the [CODE_OF_CONDUCT][coc] before.

## Contributing

For information on how to contribute, please refer to our [CONTRIBUTING][contributing] guide.

## Changelog

Features and bug fixes are listed in the [CHANGELOG][changelog] file.

## License

This library is licensed under an MIT license. See [LICENSE][license] for details.

## Acknowledgements

Made with 💙 by [kommitters Open Source](https://kommit.co)

[license]: https://github.com/kommitters/tickspot.js/blob/main/LICENSE
[coc]: https://github.com/kommitters/tickspot.js/blob/main/CODE_OF_CONDUCT.md
[changelog]: https://github.com/kommitters/tickspot.js/blob/main/CHANGELOG.md
[contributing]: https://github.com/kommitters/tickspot.js/blob/main/CONTRIBUTING.md
