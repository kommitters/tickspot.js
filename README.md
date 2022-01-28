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

client.entries.list(params);
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

client.entries.list(params, callback);
```

#### Get Entry

This will return the specified entry info. This method needs the following params:

- [Required] entryId, entry unique identificator.

```javascript
client.entries.getEntry("100773532");
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

client.entries.getEntry("100773532", callback);
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
  date: "2021-12-01",
  hours: 2,
  notes: "Entry description",
  taskId: 12345678,
};

const result = await client.entries.create(data);
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
  entryId: "101152129",
  date: "2022-01-20",
  hours: 1,
  notes: "Update entry test",
  taskId: 14541850,
  userId: 337683,
  billed: true,
};

client.entries.updateEntry(data);
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

client.entries.updateEntry(data, callback);
```

#### Delete Entry

This method will delete the entry. The params you can send are the following:

- [Required] entryId, entry unique identificator.

```javascript
client.entries.deleteEntry("100773532");
```

### Tasks

This module allows you to interact with the Tickspot tasks.

#### List Closed Tasks

This method will return all closed tasks across all projects.

```javascript
client.tasks.listClosed();
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

client.tasks.listClosed(callback);
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
