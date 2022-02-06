/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUUIDModel = /* GraphQL */ `
  query GetUUIDModel($id: ID!) {
    getUUIDModel(id: $id) {
      id
      DateTime
      UUID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUUIDModels = /* GraphQL */ `
  query ListUUIDModels(
    $filter: ModelUUIDModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUUIDModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        DateTime
        UUID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUUIDModels = /* GraphQL */ `
  query SyncUUIDModels(
    $filter: ModelUUIDModelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUUIDModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        DateTime
        UUID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
