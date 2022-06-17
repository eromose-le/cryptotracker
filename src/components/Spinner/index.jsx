import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

const Spinner = (color) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

export default Spinner;
