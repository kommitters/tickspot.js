# Clients

This module allows you to interact with the Tickspot clients.

- [List Clients](#list-clients)
- [Get Client](#get-client)
- [Create Client](#create-client)
- [Update Client](#update-client)
- [Delete Client](#delete-client)

## List Clients

This method will return all the clients that have opened projects. This method needs the following params:

- [Required] page, parameter for your request.

```javascript
const result = await client.clients.list(1);
// The result would be something like the following:
[
  {
    id: 123,
    name: "Test 1",
    archive: false,
    url: "https://secure.tickspot.com/87543/api/v2/clients/123.json",
    updated_at: "2022-03-25T18:15:16.000-04:00",
  },
  {
    id: 456,
    name: "Test 2",
    archive: false,
    url: "https://secure.tickspot.com/87543/api/v2/clients/456.json",
    updated_at: "2022-03-26T17:04:22.000-04:00",
  },
];
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  responseData.map((clientData) => {
    return {
      name: clientData.name,
    };
  });
};
const result = await client.clients.list(1, callback);
// The result would be something like the following:
[
  { name: 'Client #1' },
  { name: 'Client #2' },
  { name: 'Client #3' },
  ...
]
```

## Get Client

This will return the specified client along with a summary of project information. This method needs the following params:

- [Required] clientId, client unique identificator.

```javascript
const result = await client.clients.getClient(123);
// The result would be something like the following:
{
  id: 123,
  name: 'Client #1',
  archive: false,
  url: 'https://secure.tickspot.com/654321/api/v2/clients/123.json',
  updated_at: '2022-03-26T19:47:12.000-04:00',
  projects: {
    count: 9,
    url: 'https://secure.tickspot.com/654321/api/v2/clients/123/projects.json',
    updated_at: '2022-03-26T19:47:12.000-04:00'
  }
}
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    id: responseData.id,
  };
};

const result = await client.clients.getClient(123, callback);
// The result would be something like the following:
{ id: 123, name: 'Client #1' }
```

## Create Client

This method will create a new client from the parameters passed. It is strictly limited to administrators.

This method will return the new client info. This method needs the following params:

- [Required] name, name of the client
- [Optional] archive

```javascript
const data = {
  name: 'test #1',
  archive: false,
};

const result = await client.clients.create(data);

// The result would be something like the following:
{
  id: 123,
  name: 'test #1',
  archive: false,
  updated_at: '2022-03-08T17:29:02.000-05:00'
}
```

Optionally, You can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    name: responseData.name,
    archive: responseData.archive
  };
};

const data = {
  name: 'test #1',
  archive: false,
};

const result = await client.clients.create(data, callback);

// The result would be something like the following:
{ name: 'test #1', archive: false }
```

## Update Client

This method will update a specific client from the parameters passed and return the client info. This method needs the following params:

- [Required] clientId, client unique identificator.
- [Optional] name, name of the client
- [Optional] archive

```javascript
const data = {
  clientId: 123456,
  name: 'Client #1',
  archive: false,
};

const result = await client.clients.update(data);
// The result would be something like the following:
{
  id: 123456,
  name: 'Client #1',
  archive: false,
  url: 'https://secure.tickspot.com/141761/api/v2/clients/123456.json',
  updated_at: '2022-04-07T18:10:03.000-04:00'
}
```

Optionally, you can send a callback to perform an action on the response data. e.g:

```javascript
const callback = (responseData) => {
  return {
    name: responseData.name,
  };
};

const data = {
  clientId: 123456,
  name: "Client #1",
  archive: false,
};

const result = await client.clients.update(data, callback);
// The result would be something like the following:
{
  name: "Client #1";
}
```

## Delete Client

This method will delete a specific client. Only clients without any projects can be deleted. The params you can send are the following:

- [Required] clientId, the client unique identificator.

```javascript
const result = await client.clients.delete(123456);

// The result will be true if the client was deleted
```
