// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UUIDModel } = initSchema(schema);

export {
  UUIDModel
};