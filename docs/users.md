# Users

This module allows you to interact with the Tickspot users.

- [List Users](#list-users)
- [List Deleted Users](#list-deleted-users)
- [List User Entries](#list-user-entries)

## List Users

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

## List Deleted Users

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

## List User Entries

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
