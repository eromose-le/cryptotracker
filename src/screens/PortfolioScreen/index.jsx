import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import PortfolioAssetsList from './components/PortfolioAssetsList';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';

const PortfolioScreen = () => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  return (
    <View style={{ flex: 1 }}>
      <Suspense fallback={<Spinner color={reduxTheme.primary} />}>
        <Text
          style={{
            fontFamily: 'Roboto_700Bold',
            color: reduxTheme.primary,
            fontSize: 23,
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingBottom: 5
          }}
        >
          Portfolio
        </Text>
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
