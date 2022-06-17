import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import { Entypo, FontAwesome, Foundation, Fontisto } from '@expo/vector-icons';
import PortfolioScreen from '../screens/PortfolioScreen';
import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const screenWidth = Dimensions.get('window').width;

const BottomTabNavigator = () => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: reduxTheme.primary,
        tabBarInactiveTintColor: reduxTheme.tertiary,
        tabBarStyle: {
          backgroundColor: reduxTheme.tabBackground,
          height: screenWidth / 4.5,
          paddingBottom: 20,
          paddingTop: 8,
          borderTopColor: reduxTheme.tabTopBorderColor
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Foundation
              name="graph-pie"
              size={focused ? 30 : 25}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="star" size={focused ? 30 : 25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Fontisto
              name="player-settings"
              size={focused ? 30 : 25}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
