# playground
A simple application for playing with different build stacks and technologies.

## Tech stack

- Building
  - rush
  - pnpm
  - tsc
- Languages and Frameworks
  - Javascript
  - Typescript
  - React
- Stuff for later
  - Building: babel, emscripten
  - Languages and Frameworks: mobx. lit, C++, WASM

## Goals

- Runs on both desktop and mobile browsers (versions TBD)
- Online or offline usage (i.e. PWA)
- App can be delivered as a Github Page
- Sensitive data is encrypted in transit and at rest online
- Authenticated using github APIs
- No baked in keys(encryption, authentication, API)


## Build requirements

- `node` version compatible with rush (I use v16.14.2)
- `rush`
- `pnpm` (comes with `rush`)
- `tsc`

## Usage

To use this application, you will visit the Github page for the repo. This will setup the service worker and sync the data fork (if any). To use the application, you will need to have write access to the repo and know the encryption password. To add a new user, simply fork this repo and modify the necessary bits to to reflect the new username.

## Architecture

### Top-down

- Remote service
  - Everything served by Github as static resources except authentication.
  - Data is stored in a separate branch, not as part of the main branch.
- Client
  - A single page application, using React
- Service worker
  - Local service that client connects to whether online or offline
  - Connects to remote service to sync data when online

### Service worker (aka SW)

This is the core of the application and provides the APIs that the client will talk to. The primary communication will be via message, however files fetched for displaying the interface will be cached by the service worker to provide when offline.

#### Configuration

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

#### Fetching

SW will listen for `fetch` events that correspond to the client launch URL and cache the responses when online. When offline, the SW will respond to the `fetch` events with latest cached data.

#### Messages

SW will listen for `message` events for valid API calls and respond as requested.

**TBD** Should I be using `message` or `fetch` events for this? The logic is basically the same on the SW side, although there is slightly more work for handling unique `fetch` requests and routing them to the API implementation. If I use messages I will need to figure out how to get/include the auth headers needed.

#### Syncing

The SW will eventually need to sync with the remote server. The mechanism for that is TBD but here are some use cases to consider:

- Item was created locally
  - Item does not exist on the remote: insert item
  - Item with conflicting id exists on the remote (!): generate new id, return error to client with new id
- Item was edited or deleted locally
  - Item does not exist on the remote (!): return error to client with conflicting item details
  - Item exists on the remote
    - Item was not edited since last sync: edit or delete item
    - Item WAS EDITED since last sync (!): return error to client with conflicting item details

#### SW API

##### ***getItem(id: string)***

This api returns a single item matching the id specified, if such an item exists.

``` ts
class ItemDetails {
    id: string; // base64-encoded UUID
    title: string;
    status?: ItemStatus; // open, closed, blocked, held
    priority?: number; // 1,2,3,4
    notes: string;
    startDate: string; // YYYYMMDD
    endDate: string; // YYYYMMDD
    lastModified: timestamp; // exact time of last change -- format TBD
}
```

##### ***setItem(details: ItemDetails)***

This api will either update an existing item or insert a new one, depending on whether the `details.id` matches an existing item. `id` is the items unique identifier. This is a base64-encoded UUID. Newly generated items are practically guaranteed to be unique. If a sync conflict occurs, an error will be returned to the client with the details of the conflicting item.

##### ***deleteItem(id: string)***

This api will delete the item matching the id passed if it exists. If a sync conflict occurs, an error will be returned to the client with the details of the conflicting item.

##### ***day(date: string, startIndex: number)***

This api returns the items for the particular day. Up to 1000 items will be returned.

- `date` has the format YYYYMMDD.
- `startIndex` is optional. If not specified, the list of items returned will start at 0. If it negative or larger than the number of items available, no items will be returned.

##### ***range(startDate: string, endData: string, startIndex: number)***

This api returns a list of items with start dates within the range specified and the starting index for the first item. Up to 1000 items will be returned.

- `startDate` is optional and has the format YYYYMMDD.
- `endData` is optional and has the format YYYYMMDD.
- `startIndex` is optional. If not specified, the list of items returned will start at 0. If it negative or larger than the number of items available, no items will be returned.

##### ***backlog(startIndex: number)***

This api returns all items without a start date and the starting index for the first item. Up to 1000 items will be returned.

- `startIndex` is optional. If not specified, the list of items returned will start at 0. If it negative or larger than the number of items available, no items will be returned.


##### ***search(query: string, startIndex: number)***

This api returns all items matching the query string and the starting index for the first item. Up to 1000 items will be returned.

- `query` format is TBD.
- `startIndex` is optional. If not specified, the list of items returned will start at 0. If it negative or larger than the number of items available, no items will be returned.
