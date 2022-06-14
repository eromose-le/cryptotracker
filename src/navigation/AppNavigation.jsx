import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CoinDetailedScreen from '../screens/CoinDetailedScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AddNewAssetScreen from '../screens/AddNewAssetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  return (
    <Stack.Navigator
      initialRouteName="Root"
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetailedScreen"
        component={CoinDetailedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
        // initialParams={{ themeState }}
      />
      <Stack.Screen
        name="AddNewAssetScreen"
        component={AddNewAssetScreen}
        options={{
          title: 'Add New Asset',
          headerStyle: { backgroundColor: reduxTheme.background },
          headerTintColor: reduxTheme.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 14
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
