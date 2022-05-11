# Tasks

This module allows you to interact with the Tickspot tasks.

- [List Opened Tasks](#list-opened-tasks)
- [List Closed Tasks](#list-closed-tasks)
- [Get Task](#get-task)
- [Create Task](#create-task)
- [Update Task](#update-task)
- [Delete Task](#delete-task)
- [List Task Entries](#list-task-entries)

## List Opened Tasks

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

## List Closed Tasks

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

## Get Task

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

## Create Task

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

## Update Task

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

## Delete Task

This method will delete a specific task. The params you can send are the following:

- [Required] taskId, the task unique identificator.

**Warning**: Only tasks without any entries can be deleted

```javascript
const result = await client.tasks.delete(123456);

// The result will be true if the task was deleted
```

## List Task Entries

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
