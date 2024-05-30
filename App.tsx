import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DataDisplay from './dataDisplay';

import {
  AppProvider,
  UserProvider,
  RealmProvider,
  useApp,
  useUser,
  useRealm,
} from '@realm/react';
import DataSchema from './realstructure';
import {OpenRealmBehaviorType, OpenRealmTimeOutBehavior} from 'realm';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: OpenRealmBehaviorType.DownloadBeforeOpen,
    timeOutBehavior: OpenRealmTimeOutBehavior.OpenLocalRealm,
    timeOut: 1000,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <AppProvider id={'realtime-sample-app-bqsmael'}>
        <UserProvider>
          <RealmProvider
            schema={[DataSchema]}
            sync={{
              flexible: true,
              newRealmFileBehavior: realmAccessBehavior,
              existingRealmFileBehavior: realmAccessBehavior,
              initialSubscriptions: {
                update(subs, realm) {
                  subs.add(realm.objects(DataSchema.name));
                },
              },
            }}>
            <DataDisplay />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;
