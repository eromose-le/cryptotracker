import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);

  var themeState = { body: 'yellow' };

  const handleToggle = (toggle) => {
    setToggle(toggle);
  };

  return (
    <View>
      <Text style={{ color: 'white', padding: 20 }}>Profile Screen</Text>
      <TouchableOpacity onPress={() => handleToggle(!toggle)}>
        <Text
          style={{
            color: '#fff',
            // backgroundColor: toggle ? 'red' : 'green',
            backgroundColor: themeState.body,
            padding: 20
          }}
        >
          {toggle ? 'OFF' : 'ON'}
        </Text>
        <Text style={{ color: 'pink', padding: 20 }}>
          {themeState.toString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
