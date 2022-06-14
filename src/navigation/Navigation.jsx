import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import WatchlistProvider from '../../src/Contexts/WatchlistContext';
import { RecoilRoot } from 'recoil';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import ThemeProvider from '../../src/Contexts/ThemeContext';
import AppNavigation from './AppNavigation';
import { useSelector } from 'react-redux';

export default function Navigation() {
  const { reduxTheme } = useSelector((state) => state.themeReducer);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    DroidSans: require('../../assets/fonts/DroidSans.ttf'),
    Capuche: require('../../assets/fonts/Capuche.otf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: reduxTheme.body
        }
      }}
    >
      <RecoilRoot>
        <ThemeProvider>
          <WatchlistProvider>
            <View
              style={{
                ...styles.container,
                backgroundColor: reduxTheme.background
              }}
            >
              <AppNavigation />
              <StatusBar style={reduxTheme.mood} />
            </View>
          </WatchlistProvider>
        </ThemeProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  }
});
