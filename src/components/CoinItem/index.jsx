import React from 'react';
import { Text, View, Image, Pressable, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

const CoinItem = ({ marketCoin }) => {
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
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1_000_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000_000)} T`;
    }
    if (marketCap > 1_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000)} B`;
    }
    if (marketCap > 1_000_000) {
      return `${Math.floor(marketCap / 1_000_000)} M`;
    }
    if (marketCap > 1_000) {
      return `${Math.floor(marketCap / 1_000)} K`;
    }
    return marketCap;
  };

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate('CoinDetailedScreen', { coinId: id })}
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
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
            size={12}
            color={percentageColor}
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
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
          width={100}
          height={50}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#08130D',
            backgroundGradientToOpacity: 0.5,
            strokeWidth: 1,
            color: (opacity = 1) => `${percentageColor}`,
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
      <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: 'white' }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
