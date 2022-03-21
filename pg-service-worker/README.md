# pg-service-worker (aka SW)

This is the core of the application and provides the APIs that the client will talk to. Direct communication with the SW will be via messages. Some client `fetch` calls will also be intercepted. Requests related to displaying the interface will be passed on to the real hosting service when online and cached by the service worker to provide when offline. Requests related to data storage APIs will be intercepted and responded to locally. Syncing with a remote repo (if any) will be asynchronous to any client requests. 

## Configuration

The SW will be installed when the client app is launched. TBD how upgrades will be handled as there may be data migration needed.

Configuration data for the SW will include:

- Information directly gathered from the launched client URL
  - app repo
  - user name
- Information derived and/or defaulted from the launched client URL
  - data repo
- Information provided by the client APP
  - auth token
  - API key
  - encryption password

## Fetching

SW will listen for `fetch` events that correspond to the client launch URL and cache the responses when online. When offline, the SW will respond to the `fetch` events with latest cached data.

## Messages

SW will listen for `message` events for valid API calls and respond as requested.

**Question:** Should I be using `message` or `fetch` events for this? The logic is basically the same on the SW side, although there is slightly more work for handling unique `fetch` requests and routing them to the API implementation. If I use messages I will need to figure out how to get/include the auth headers needed.
**Answer:** The client will be built as if the service worker did not exist for the most part. It will use direct `fetch` to the data url with a REST API (outlined below). There will be support for a few service worker specific features via messaging. Those are also detailed below. 

## Syncing

The SW will eventually need to sync with the remote server. The mechanism for that is TBD.

Some possibilities:

- Timer thread polling periodically for changes from the server. This is likely the first cut.
- PUSH notifications from the server. This may only be feasible for an active server.

We will need to track the `lastSyncDate`.

Here are some use cases to consider:

- Item was created locally
  - Item does not exist on the remote: insert item
  - Item with conflicting id exists on the remote (!): generate new id, return error to client with new id
- Item was edited or deleted locally
  - Item does not exist on the remote (!): return error to client with conflicting item details
  - Item exists on the remote
    - Item was not edited since last sync: edit or delete item
    - Item WAS EDITED since last sync (!): return error to client with conflicting item details
