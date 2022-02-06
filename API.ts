/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUUIDModelInput = {
  id?: string | null,
  DateTime: string,
  UUID: string,
  _version?: number | null,
};

export type ModelUUIDModelConditionInput = {
  DateTime?: ModelStringInput | null,
  UUID?: ModelStringInput | null,
  and?: Array< ModelUUIDModelConditionInput | null > | null,
  or?: Array< ModelUUIDModelConditionInput | null > | null,
  not?: ModelUUIDModelConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UUIDModel = {
  __typename: "UUIDModel",
  id: string,
  DateTime: string,
  UUID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateUUIDModelInput = {
  id: string,
  DateTime?: string | null,
  UUID?: string | null,
  _version?: number | null,
};

export type DeleteUUIDModelInput = {
  id: string,
  _version?: number | null,
};

export type ModelUUIDModelFilterInput = {
  id?: ModelIDInput | null,
  DateTime?: ModelStringInput | null,
  UUID?: ModelStringInput | null,
  and?: Array< ModelUUIDModelFilterInput | null > | null,
  or?: Array< ModelUUIDModelFilterInput | null > | null,
  not?: ModelUUIDModelFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUUIDModelConnection = {
  __typename: "ModelUUIDModelConnection",
  items:  Array<UUIDModel | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateUUIDModelMutationVariables = {
  input: CreateUUIDModelInput,
  condition?: ModelUUIDModelConditionInput | null,
};

export type CreateUUIDModelMutation = {
  createUUIDModel?:  {
    __typename: "UUIDModel",
    id: string,
    DateTime: string,
    UUID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUUIDModelMutationVariables = {
  input: UpdateUUIDModelInput,
  condition?: ModelUUIDModelConditionInput | null,
};

export type UpdateUUIDModelMutation = {
  updateUUIDModel?:  {
    __typename: "UUIDModel",
    id: string,
    DateTime: string,
    UUID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUUIDModelMutationVariables = {
  input: DeleteUUIDModelInput,
  condition?: ModelUUIDModelConditionInput | null,
};

export type DeleteUUIDModelMutation = {
  deleteUUIDModel?:  {
    __typename: "UUIDModel",
    id: string,
    DateTime: string,
    UUID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetUUIDModelQueryVariables = {
  id: string,
};

export type GetUUIDModelQuery = {
  getUUIDModel?:  {
    __typename: "UUIDModel",
    id: string,
    DateTime: string,
    UUID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUUIDModelsQueryVariables = {
  filter?: ModelUUIDModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUUIDModelsQuery = {
  listUUIDModels?:  {
    __typename: "ModelUUIDModelConnection",
    items:  Array< {
      __typename: "UUIDModel",
      id: string,
      DateTime: string,
      UUID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUUIDModelsQueryVariables = {
  filter?: ModelUUIDModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUUIDModelsQuery = {
  syncUUIDModels?:  {
    __typename: "ModelUUIDModelConnection",
    items:  Array< {
      __typename: "UUIDModel",
      id: string,
      DateTime: string,
      UUID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUUIDModelSubscription = {
  onCreateUUIDModel?:  {
    __typename: "UUIDModel",
    id: string,
    DateTime: string,
    UUID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUUIDModelSubscription = {
  onUpdateUUIDModel?:  {
    __typename: "UUIDModel",
    id: string,
    DateTime: string,
    UUID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUUIDModelSubscription = {
  onDeleteUUIDModel?:  {
    __typename: "UUIDModel",
    id: string,
    DateTime: string,
    UUID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
