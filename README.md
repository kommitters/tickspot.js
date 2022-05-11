# Tickspot.js

Tickspot.js is a Node.js client for [tickspot api](https://github.com/tick/tick-api).

## Installation

Get the package via npm

```shell
npm i tickspot.js
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

## Documentation
- [Entries Documentation](docs/entries.md)
- [Tasks Documentation](docs/tasks.md)
- [Projects Documentation](docs/projects.md)
- [Users Documentation](docs/users.md)
- [Clients Documentation](docs/clients.md)

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
