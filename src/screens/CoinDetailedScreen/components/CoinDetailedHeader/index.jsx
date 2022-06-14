import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useWatchlist } from '../../../../Contexts/WatchlistContext';
import { useSelector } from 'react-redux';

const CoinDetailedHeader = (props) => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const { coinId, image, symbol, marketCapRank } = props;
  const navigation = useNavigation();
  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } =
    useWatchlist();

  const checkIfCoinIsWatchlisted = () =>
    watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleWatchlistCoin = () => {
    if (checkIfCoinIsWatchlisted()) {
      return removeWatchlistCoinId(coinId);
    }
    return storeWatchlistCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color={reduxTheme.primary}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={{ ...styles.tickerTitle, color: reduxTheme.primary }}>
          {symbol.toUpperCase()}
        </Text>
        <View
          style={{
            ...styles.rankContainer,
            backgroundColor: reduxTheme.secondary
          }}
        >
          <Text
            style={{
              color: reduxTheme.primary,
              fontWeight: 'bold',
              fontSize: 15
            }}
          >
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchlisted() ? 'star' : 'star-o'}
        size={25}
        color={checkIfCoinIsWatchlisted() ? '#FFBF00' : reduxTheme.primary}
        onPress={handleWatchlistCoin}
      />
    </View>
  );
};

export default CoinDetailedHeader;
