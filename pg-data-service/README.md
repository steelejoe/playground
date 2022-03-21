# pg-data-service

This is an Adapter interface that translates calls to our API below into calls made to a storage service. Several types of storage service are available. This is intended to be used either by the [pg-service-worker](./../pg-service-worker/README.md) or by a remote server.

## Requirements

- Data encrypted at rest and in transit between machines

## Storage sources

These are characterized as:

- Static: Service provides raw storage only
- Active: Service provides storage and possibly other facilities (e.g. encryption)

### Local

This will be the testbed service. This will store everything locally. TBD whether it will be written to disk.

### Github

This will be the initial remote storage source. Everything is done on the client side except authentication. Data will be stored in the same repo as the application, but in a separate branch. Each repo is intended for a single user and no-one else should be permitted to commit to the repo. Repo can be public or private. For a public repo all data can be seen, which means encryption is required.

### Google Drive

It would be great to be able to support Google Drive storage for this data as well.

### Container

Need to build a Docker image that includes this service plus an Express wrapper to serve the API. I can test this locally.
