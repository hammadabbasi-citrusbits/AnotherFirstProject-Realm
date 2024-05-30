import {Realm} from '@realm/react';

const app = new Realm.App({id: 'realtime-sample-app-bqsmael'}); // Replace with your Realm App ID

async function getRealm() {
  const user = await app.logIn(Realm.Credentials.anonymous()); // Authenticate user
  return user.mongoClient('mongodb-atlas'); // Return MongoDB client
}

export {getRealm};
