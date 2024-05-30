// LogIn.tsx

import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useApp, useUser} from '@realm/react';

function LogIn() {
  const app = useApp();
  const user = useUser();

  const handleLogin = async () => {
    await app.logIn(Realm.Credentials.anonymous());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please log in</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default LogIn;
