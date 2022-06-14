import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator
} from 'react-native';
import CoinDetailedHeader from './components/CoinDetailedHeader';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';

import { LineChart, CandlestickChart } from 'react-native-wagmi-charts';
import { MaterialIcons } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandleChartData
} from '../../services/requests';
import FilterComponent from './components/FilterComponent';

const filterDaysArray = [
  { filterDay: '1', filterText: '24h' },
  { filterDay: '7', filterText: '7d' },
  { filterDay: '30', filterText: '30d' },
  { filterDay: '365', filterText: '1y' },
  { filterDay: 'max', filterText: 'All' }
];

const CoinDetailedScreen = () => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId }
  } = route;

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState('1');
  const [usdValue, setUsdValue] = useState('');
  const [selectedRange, setSelectedRange] = useState('1');
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  // coinData
  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  // marketData
  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  // candleStickChartData
  const fetchCandleStickChartData = async (selectedRangeValue) => {
    const fetchedSelectedCandleChartData = await getCandleChartData(
      coinId,
      selectedRangeValue
    );
    setCoinCandleChartData(fetchedSelectedCandleChartData);
  };

  // mount coinData && marketData
  useEffect(() => {
    fetchCoinData();
    fetchCandleStickChartData();
    fetchMarketCoinData(1);
  }, []);

  // refetch MarketCoinData based on filter value
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };

  // memolize selectedRangeValue for filtering
  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  // await loading with ActivityIndicator
  if (loading || !coin || !coinMarketData || !coinCandleChartData) {
    return <ActivityIndicator size="large" />;
  }

  // destructuring coinData
  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: { market_cap_rank, current_price, price_change_percentage_24h }
  } = coin;

  // destructior marketData
  const { prices } = coinMarketData;

  // set color dynamically
  const percentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white';
  const chartColor = current_price.usd > prices[0][1] ? '#16c784' : '#ea3943';
  const screenWidth = Dimensions.get('window').width;

  // formating currency && prices
  const formatCurrency = ({ value }) => {
    'worklet';
    if (value === '') {
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {/* new chart wrapper */}
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        {/* header component */}
        <CoinDetailedHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        {/* price, balance change */}
        <View style={styles.priceContainer}>
          <View>
            <Text style={{ ...styles.name, color: reduxTheme.primary }}>
              {name}
            </Text>
            <LineChart.PriceText
              format={formatCurrency}
              style={{ ...styles.currentPrice, color: reduxTheme.primary }}
            />
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              paddingHorizontal: 3,
              paddingVertical: 8,
              borderRadius: 5,
              flexDirection: 'row'
            }}
          >
            <AntDesign
              name={
                price_change_percentage_24h < 0
                  ? 'caretdown'
                  : 'caretup' || 'white'
              }
              size={12}
              color={'white'}
              style={{ alignSelf: 'center', marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>

        {/* filter */}
        <View
          style={{
            ...styles.filtersContainer,
            backgroundColor: reduxTheme.tableColor
          }}
        >
          {filterDaysArray.map((day) => (
            <FilterComponent
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
              key={day.filterText}
            />
          ))}
          {isCandleChartVisible ? (
            <MaterialIcons
              name="show-chart"
              size={24}
              color={chartColor}
              onPress={() => setIsCandleChartVisible(false)}
            />
          ) : (
            <MaterialIcons
              name="waterfall-chart"
              size={24}
              color={chartColor}
              onPress={() => setIsCandleChartVisible(true)}
            />
          )}
        </View>

        {/* chart || candleStickChart*/}
        {isCandleChartVisible ? (
          <CandlestickChart.Provider
            data={coinCandleChartData.map(
              ([timestamp, open, high, low, close]) => ({
                timestamp,
                open,
                high,
                low,
                close
              })
            )}
          >
            <CandlestickChart height={screenWidth / 2} width={screenWidth}>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip />
              </CandlestickChart.Crosshair>
            </CandlestickChart>

            {/* price range High || Low etc.. */}
            <View style={styles.candleStickDataContainer}>
              <View>
                <Text
                  style={{
                    ...styles.candleStickTextLabel,
                    color: reduxTheme.tertiary
                  }}
                >
                  Open
                </Text>
                <CandlestickChart.PriceText
                  style={{
                    ...styles.candleStickText,
                    color: reduxTheme.primary
                  }}
                  type="open"
                />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.candleStickTextLabel,
                    color: reduxTheme.tertiary
                  }}
                >
                  High
                </Text>
                <CandlestickChart.PriceText
                  style={{
                    ...styles.candleStickText,
                    color: reduxTheme.primary
                  }}
                  type="high"
                />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.candleStickTextLabel,
                    color: reduxTheme.tertiary
                  }}
                >
                  Low
                </Text>
                <CandlestickChart.PriceText
                  style={{
                    ...styles.candleStickText,
                    color: reduxTheme.primary
                  }}
                  type="low"
                />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.candleStickTextLabel,
                    color: reduxTheme.tertiary
                  }}
                >
                  Close
                </Text>
                <CandlestickChart.PriceText
                  style={{
                    ...styles.candleStickText,
                    color: reduxTheme.primary
                  }}
                  type="close"
                />
              </View>
            </View>

            {/* Date && Time */}
            <CandlestickChart.DatetimeText
              style={{
                color: reduxTheme.primary,
                fontWeight: '700',
                margin: 10
              }}
            />
          </CandlestickChart.Provider>
        ) : (
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        )}

        {/* converter */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={{ color: reduxTheme.primary, alignSelf: 'center' }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: reduxTheme.primary,
                color: reduxTheme.primary
              }}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={{ color: reduxTheme.primary, alignSelf: 'center' }}>
              USD
            </Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: reduxTheme.primary,
                color: reduxTheme.primary
              }}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailedScreen;
