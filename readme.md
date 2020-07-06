# @gojob/sfmc-rest-sdk

## NPM publish

**To publish a new version of this package, you have to build the project before run `npm publish`.**

## Description

The purpose of this library is to provide a Typescript wrapper around Salesforce Marketing Cloud API: [SFMC](https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/index-api.htm).

## Installation

```
yarn add @gojob/sfmc-rest-sdk
```

## Usage example

```typescript
import SFMC from '@gojob/sfmc-rest-sdk';

const sdk = new SFMC({
  domain: "mcdomainname",
  clientId: "123",
  clientSecret: "456",
  grantType: "client_credentials",
});

// ...

const makeSyncRequest = async () => {
  try {
    await sdk.dataEvents.sync.insertRows(
      [{
        keys: { subscriber_key: '123' },
        values: { email: 'test-123@example.com' },
      }],
      "DATAEXTENSION_KEY"
    );
  } catch (e) {
    console.log(e);
  }
};

await makeSyncRequest();
```

## Documentation

### Authentification

When dealing with SFMC REST API, all requests have to be authentified through a OAuth token that has a time based expiration. 
All requests must also be correctly declaring permission roles.
__This sdk handle automatic authentification and token renewal through the v2/token Marketing Cloud APIs__


### Requestable

In addition to authentification, the Requestable class can be used to request any REST endpoint of the Marketing Cloud APIs that wouldn't be wrapped into existing classes

```typescript
import { Requestable } from '@gojob/sfmc-rest-sdk';

const req = new Requestable();

req.authenticatedRequest({
  type: RequestType.POST,
  endpoint: `hub/whatever/mc/endpoint`,
  scope: Scope.according_scope,
  data,
});


```

### API wrapper classes

|       Class    |                                            REST API Doc                                                   |  Description                      |
|:--------------:|:---------------------------------------------------------------------------------------------------------:|-----------------------------------|
| Auth           | [SFMC.Auth](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/getBaseURLs.htm)            | Authentification V2 token API     |
| DataEventsSync | [SFMC.DataEvents](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/asynchronous_processing_scenarios.htm)                                                | Sync operations on dataextensions |
| DataEventsASync | [SFMC.DataEvents](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/asynchronous_processing_scenarios.htm)                                                | Sync operations on dataextensions |

#### Data Events API