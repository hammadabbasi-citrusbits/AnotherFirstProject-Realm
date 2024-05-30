import React, {useEffect, useState} from 'react';
import Realm from 'realm';
import {useUser, useApp, AppProvider, UserProvider} from '@realm/react';
import {View, Text, FlatList} from 'react-native';
import {getRealm} from './realm';

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
  const user = useUser();
  const [data, setData] = useState();

  const watchForAllChanges = async collection => {
    try {
      for await (const change of collection.watch()) {
        const updatedData = await collection.find();
        setData(updatedData);
      }
    } catch (error) {
      // console.error('Error watching changes:', error);
    }
  };

  useEffect(() => {
    const plants = user
      .mongoClient('mongodb-atlas')
      .db('example')
      .collection('plants');
    const collection = user
      .mongoClient('mongodb-atlas')
      .db('test')
      .collection('datas');
    const fetchInitialData = async () => {
      try {
        const initialData = await collection.find();
        setData(initialData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();

    watchForAllChanges(collection);
  }, [user, watchForAllChanges]);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <Text style={{color: 'red'}}>{item.value}</Text>
        )}
      />
    </View>
  );
}

export default AppWrapper;
