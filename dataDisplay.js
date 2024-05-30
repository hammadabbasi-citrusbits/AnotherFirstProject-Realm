import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {getRealm} from './realm'; // Import the function to initialize Realm

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true; // A flag to track component mount status

    const fetchData = async () => {
      try {
        const realm = await getRealm(); // Initialize Realm
        const collection = realm.db('test').collection('datas'); // Access collection
        const initialData = await collection.find(); // Fetch initial data
        if (isMounted) {
          setData(initialData); // Set initial data to state
        }

        // Set up change stream to reactively update data
        for await (const change of collection.watch()) {
          if (!isMounted) {
            return; // Exit loop if component is unmounted
          }
          console.log('Change detected:', change);
          const updatedData = await collection.find(); // Fetch updated data
          if (isMounted) {
            setData(updatedData); // Update state with updated data
          }
        }
      } catch (error) {
        console.error({error});
        console.error('Error watching changes:', error);
      }
    };

    fetchData(); // Call fetchData function when component mounts

    return () => {
      isMounted = false; // Clean up function to set isMounted to false when component unmounts
    };
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
};

export default DataDisplay;
