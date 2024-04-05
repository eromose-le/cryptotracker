import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ProfileHeader = () => {
  const navigation = useNavigation();
  const { reduxTheme } = useSelector((state) => state.themeReducer);

  return (
    <View style={styles.headerContainer}>
      {/* back button */}
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color={reduxTheme.primary}
        onPress={() => navigation.goBack()}
      />
      {/* title */}
      <View style={styles.profileContainer}>
        <Text
          style={{
            ...styles.profileTitle,
            color: reduxTheme.primary,
            fontFamily: 'Roboto_700Bold'
          }}
        >
          Edit Profile
        </Text>
      </View>
      {/* right */}
      <View />
    </View>
  );
};

export default ProfileHeader;
