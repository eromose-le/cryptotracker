import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import SwitchButton from '../../components/Button';
import ProfileHeader from './ProfileHeader/ProfileHeader';

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { reduxThemeToggled, reduxTheme } = useSelector(
    (state) => state.themeReducer
  );

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ProfileHeader />
      <View>
        <Text style={{ color: 'white', padding: 20 }}>Profile Screen</Text>
      </View>
      <SwitchButton />
    </View>
  );
};

export default ProfileScreen;
