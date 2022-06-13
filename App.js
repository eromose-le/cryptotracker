import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import WatchlistProvider from './src/Contexts/WatchlistContext';
import { RecoilRoot } from 'recoil';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import ThemeProvider from './src/Contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore(store);

export default function App() {
  const [themeState, setThemeState] = useState('themeObject');

  const getThemeData = async () => {
    const jsonValue = await AsyncStorage.getItem('@theme_colors');
    setThemeState(jsonValue != null ? JSON.parse(jsonValue) : []);
  };

  useEffect(() => {
    getThemeData();
    console.log('app-ThemeState', themeState);
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    DroidSans: require('./assets/fonts/DroidSans.ttf'),
    Capuche: require('./assets/fonts/Capuche.otf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <ReduxProvider store={store}>
      <NavigationContainer
        theme={{
          colors: {
            background: '#121212'
          }
        }}
      >
        <RecoilRoot>
          <ThemeProvider>
            <WatchlistProvider>
              <View style={styles.container}>
                <Navigation setThemeState={setThemeState} />
                <StatusBar style="light" />
              </View>
            </WatchlistProvider>
          </ThemeProvider>
        </RecoilRoot>
      </NavigationContainer>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50
  }
});
