import * as React from 'react';
import Navigation from './src/navigation/Navigation';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore(store);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
}
