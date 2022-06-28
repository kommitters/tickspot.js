# Entries

This module allows you to interact with the Tickspot entries.

- [List Entries](#list-entries)
- [Get Entry](#get-entry)
- [Create Entry](#create-entry)
- [Update Entry](#update-entry)
- [Delete Entry](#delete-entry)

## List Entries

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

const result = await tickspot.entries.list(params);

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

const result = await tickspot.entries.list(params, callback);
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

## Get Entry

This will return the specified entry info. This method needs the following params:

- [Required] entryId, entry unique identificator.

```javascript
const result = await tickspot.entries.getEntry(1);

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

const result = await tickspot.entries.getEntry(1, callback);

// The result would be something like the following:
{
  id: 1,
  notes: 'Example Task.',
  day: 8,
  month: 11,
  year: 2021
}

```

## Create Entry

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

const result = await tickspot.entries.create(data);

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

const result = await tickspot.entries.create(data, callback);

// The result would be something like the following:
{
  entryDate: {
    day: 08,
    moth: 11,
    year: 2021
  }
}
```

## Update Entry

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

const result = await tickspot.entries.updateEntry(data);

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

const result = await tickspot.entries.updateEntry(data, callback);
// The result would be something like the following:
{
  id: 1,
  notes: 'Update entry test',
  day: 22,
  moth: 1,
  year: 2022,
}
```

## Delete Entry

This method will delete the entry. The params you can send are the following:

- [Required] entryId, entry unique identificator.

```javascript
const result = await tickspot.entries.deleteEntry("100773532");

// The result will be true if task was deleted
```

