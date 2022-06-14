import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import PortfolioAssetsList from './components/PortfolioAssetsList';
import { useSelector } from 'react-redux';

const PortfolioScreen = () => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
          <Text style={{ color: reduxTheme.primary }}>
            Loading Please Wait!
          </Text>
        }
      >
        <Text
          style={{
            fontFamily: 'Capuche',
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
