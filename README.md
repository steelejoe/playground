# playground
A simple application for playing with different build stacks and technologies.

## Goals

- Runs on both desktop and mobile browsers (versions TBD)
- Online or offline usage (i.e. PWA)
- App can be delivered as a Github Page
- Sensitive data is encrypted in transit and at rest online
- Authenticated using github APIs
- No baked in keys(encryption, authentication, API)


## Build requirements

- `node` version compatible with rush (I use v16.14.2)
- `rush` and `pnpm`
- `tsc`
### Tech stack

- Javascript/Typescript
- Node
- React
- Express

## Usage

To use this application, you will visit the Github page for the repo. This will setup the service worker and sync the data fork (if any). To use the application, you will need to have write access to the repo and know the encryption password. To add a new user, simply fork this repo and modify the necessary bits on your fork to to reflect the new username.

## Architecture

- Client
  - A single page application, using React
  - See [./pg-client/README.md] for more details
- Service worker
  - Local service that client connects to whether online or offline
  - Connects to remote service to sync data when online
  - See [./pg-service-worker/README.md] for more details
- Data Service
  - Data storage implementation
  - This is used by the service worker, but may also be part of a remote server
  - See [./pg-data-service/README.md] for more details
