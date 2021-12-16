# TogglTick
TogglTick is a Node.js client for [tickspot v2 api](https://github.com/tick/tick-api). 

## Installation

### Install via NPM
Get the package

```shell
$ npm i toggltick.js
```

Include the client at your application

```javascript
import Client from 'toggltick.js';
```
## Usage
Instance the Client with your subscription id, api token and user-agent email as following: 

```javascript
const client = new CLient({ subscriptionId: 'subscriptionId', apiToken: 'apiToken', agentEmail: 'agentEmail' })
```

### Entries
With the entries module you can use the following methods: 
- Create

  The create method creates an entry with the following data: 
  - date
  - hours: required*
  - notes: entry description
  - task_id: required*
  - user_id: will be ignored if the user is not an administrator

  Optionally, you can add a callback to handle the response data from the tickspot API. 

  For example: 
  ```javascript
  ...
  const data = {
  date: '2021-12-01',
  hours: 2,
  notes: 'Entry description',
  taskId: 12345678,
  };
  const dataCallback = (data) => data;

  client.entries.create(data, dataCallback);
  ```
  The create method returns a promise with the response data from the tickspot API or with your custom output data handled with the callback.

## Development

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
