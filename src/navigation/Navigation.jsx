import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import WatchlistProvider from '../../src/Contexts/WatchlistContext';
import { RecoilRoot } from 'recoil';
import ThemeProvider from '../../src/Contexts/ThemeContext';
import AppNavigation from './AppNavigation';
import { useSelector } from 'react-redux';
import { assets } from '../../assets/constants';

export default function Navigation() {
  const { reduxTheme } = useSelector((state) => state.themeReducer);

  let [fontsLoaded] = assets.useFonts({
    Inter_900Black: assets.Inter_900Black,
    DroidSans: assets.DroidSans,
    Capuche: assets.Capuche,
    Roboto_400Regular: assets.Roboto_400Regular,
    Roboto_500Medium: assets.Roboto_500Medium,
    Roboto_700Bold: assets.Roboto_700Bold
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
                backgroundColor: reduxTheme.body
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
