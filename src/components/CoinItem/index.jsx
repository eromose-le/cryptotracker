import React from 'react';
import { Text, View, Image, Pressable, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

const CoinItem = ({ marketCoin }) => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    sparkline_in_7d,
    symbol,
    market_cap,
    image
  } = marketCoin;

  const navigation = useNavigation();

  const percentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white';

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)} K`;
    }
    return marketCap;
  };

  return (
    <Pressable
      style={{
        ...styles.coinContainer,
        borderBottomColor: reduxTheme.lineColor
      }}
      onPress={() => navigation.navigate('CoinDetailedScreen', { coinId: id })}
    >
      {/* left */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1
        }}
      >
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
          <Text
            style={{
              ...styles.title,
              color: reduxTheme.primary
            }}
          >
            {name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                ...styles.rankContainer,
                backgroundColor: reduxTheme.secondary
              }}
            >
              <Text
                style={{
                  ...styles.rank,
                  color: reduxTheme.primary
                }}
              >
                {market_cap_rank}
              </Text>
            </View>
            <Text style={{ ...styles.text, color: reduxTheme.primary }}>
              {symbol.toUpperCase()}
            </Text>
            <AntDesign
              name={
                price_change_percentage_24h < 0
                  ? 'caretdown'
                  : 'caretup' || 'white'
              }
              size={12}
              color={percentageColor}
              style={{ alignSelf: 'center', marginRight: 5 }}
            />
            <Text style={{ color: percentageColor }}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
      {/* middle */}
      <View style={{ flex: 0.5, paddingLeft: 10 }}>
        <LineChart
          withVerticalLabels={false}
          withHorizontalLabels={false}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          data={{
            datasets: [
              {
                data: sparkline_in_7d.price
              }
            ]
          }}
          width={75}
          height={55}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#08130D',
            backgroundGradientToOpacity: reduxTheme.gradientOpacity,
            strokeWidth: 1,
            color: (opacity = 0) => `${percentageColor}`,
            style: {
              borderRadius: 16,
              fontSize: 10
            }
          }}
          bezier
          style={{
            paddingRight: 0,
            fontSize: 10
          }}
        />
      </View>
      {/* right */}
      <View style={{ marginLeft: 'auto', alignItems: 'flex-end', flex: 0.7 }}>
        <Text
          style={{
            ...styles.title,
            color: reduxTheme.primary
          }}
        >
          {current_price}
        </Text>
        <Text style={{ color: reduxTheme.primary }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
