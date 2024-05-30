// realm.js
import Realm from 'realm';

const DataSchema = {
  name: 'Data',
  properties: {
    _id: 'objectId',
    value: 'string',
    date: 'date', // Adding date field to the Realm schema
  },
  primaryKey: '_id',
};

let realmInstance = null;

export const getRealm = async () => {
  if (!realmInstance) {
    realmInstance = await Realm.open({
      schema: [DataSchema],
    });
  }
  return realmInstance;
};
