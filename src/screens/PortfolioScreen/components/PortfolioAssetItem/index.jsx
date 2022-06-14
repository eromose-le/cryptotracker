import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const PortfolioAssetsItem = ({ assetItem }) => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);

  const {
    currentPrice,
    image,
    name,
    priceChangePercentage,
    quantityBought,
    ticker
  } = assetItem;

  const isChangePositive = () => priceChangePercentage >= 0;

  const renderHoldings = () => (quantityBought * currentPrice).toFixed(2);

  return (
    <>
      <View
        style={{
          ...styles.coinContainer,
          backgroundColor: reduxTheme.background
        }}
      >
        {/* 1st column */}
        <View style={{ flex: 1.2, flexDirection: 'row' }}>
          <Image
            source={{ uri: image }}
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
              alignSelf: 'center'
            }}
          />
          <View>
            <Text style={{ ...styles.title, color: reduxTheme.primary }}>
              {name}
            </Text>
            <Text style={{ ...styles.ticker, color: reduxTheme.tertiary }}>
              {ticker}
            </Text>
          </View>
        </View>
        {/* 2nd column */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginLeft: 'auto',
              alignItems: 'flex-end'
            }}
          >
            <Text style={{ ...styles.title, color: reduxTheme.primary }}>
              ${currentPrice}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign
                name={isChangePositive() ? 'caretup' : 'caretdown'}
                size={12}
                color={isChangePositive() ? '#16c784' : '#ea3943'}
                style={{ alignSelf: 'center', marginRight: 5 }}
              />
              <Text
                style={{
                  color: isChangePositive() ? '#16c784' : '#ea3943',
                  fontWeight: '600'
                }}
              >
                {priceChangePercentage?.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        {/* 3rd column */}
        <View style={{ flex: 1 }}>
          <View style={styles.quantityContainer}>
            <Text style={{ ...styles.title, color: reduxTheme.primary }}>
              ${renderHoldings()}
            </Text>
            <Text style={{ ...styles.ticker, color: reduxTheme.tertiary }}>
              {quantityBought} {ticker}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default PortfolioAssetsItem;
