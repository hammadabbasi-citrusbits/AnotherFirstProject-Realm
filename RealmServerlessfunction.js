import React, {useEffect, useState} from 'react';
import {useUser, AppProvider, UserProvider} from '@realm/react';
import {View, Text, FlatList} from 'react-native';
const Realm = require('realm');

function AppWrapper() {
  return (
    <AppProvider id={'realtime-sample-app-bqsmael'}>
      <UserProvider>
        <NotificationSetter />
      </UserProvider>
    </AppProvider>
  );
}

const appConfig = {
  id: 'realtime-sample-app-bqsmael',
  url: 'https://realm-dev.mongodb.com',
  timeout: 1000,
};

async function NotificationSetter() {
  const app = new Realm.App(appConfig);
  const credentials = Realm.Credentials.anonymous();
  let user = await app.logIn(credentials);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Wrap the asynchronous operation with startTransition
        await new Promise((resolve, reject) => {
          startTransition(() => {
            user.functions
              .getData()
              .then(serverlessData => {
                setData(serverlessData);
                resolve();
              })
              .catch(error => {
                console.error('Error fetching serverless data:', error);
                reject(error);
              });
          });
        });
      } catch (error) {
        console.error('Error in startTransition:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text>{item.value}</Text>} // Ensure item.value exists and is defined
      />
    </View>
  );
}

export default AppWrapper;
