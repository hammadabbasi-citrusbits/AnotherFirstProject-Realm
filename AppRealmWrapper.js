import React, {useEffect, useState} from 'react';
import Realm from 'realm';
import {useUser, useApp, AppProvider, UserProvider} from '@realm/react';
import {View, Text, FlatList} from 'react-native';
import {getRealm} from './realm'; // Import the function to initialize Realm

function AppWrapper() {
  return (
    <AppProvider id={'realtime-sample-app-bqsmael'}>
      <UserProvider>
        <NotificationSetter />
      </UserProvider>
    </AppProvider>
  );
}

function NotificationSetter() {
  // Get Realm app instance
  const app = useApp();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Log in user anonymously
        const user = await app.logIn(Realm.Credentials.anonymous());

        const mongodb = user.mongoClient('mongodb-atlas');
        const collection = mongodb.db('test').collection('datas');

        // Fetch initial data
        const initialData = await collection.find();
        setData(initialData);

        // Set up change listener to reactively update data
        const onRealmChange = () => {
          console.log('Something changed!');
          // Fetch updated data
          const updatedData = collection.find();
          setData(updatedData);
        };

        // Add change listener to Realm instance
        collection.realm.addListener('change', onRealmChange);

        // Clean up change listener
        return () => {
          // Remove change listener from Realm instance
          collection.realm.removeListener('change', onRealmChange);
        };
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => <Text>{item.value}</Text>}
      />
    </View>
  );
}

export default AppWrapper;
