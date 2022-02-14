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

The create method returns a promise with the response data from the tickspot API.

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
