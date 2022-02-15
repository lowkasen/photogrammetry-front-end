import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UUIDModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UUIDModel {
  readonly id: string;
  readonly DateTime: string;
  readonly UUID: string;
  readonly Email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UUIDModel, UUIDModelMetaData>);
  static copyOf(source: UUIDModel, mutator: (draft: MutableModel<UUIDModel, UUIDModelMetaData>) => MutableModel<UUIDModel, UUIDModelMetaData> | void): UUIDModel;
}