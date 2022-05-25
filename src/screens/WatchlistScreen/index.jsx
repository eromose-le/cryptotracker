import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { useWatchlist } from '../../Contexts/WatchlistContext';
import CoinItem from '../../components/CoinItem';
import { getWatchlistedCoins } from '../../services/requests';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const WatchlistScreen = () => {
  const { watchlistCoinIds, clearWatchlist } = useWatchlist();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchlistCoinIds.join('%2C');

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(
      1,
      transformCoinIds()
    );
    setCoins(watchlistedCoinsData);
    setLoading(false);
  };

  console.log('coins', coins);
  useEffect(() => {
    fetchWatchlistedCoins();
  }, [watchlistCoinIds]);

  return (
    <>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={fetchWatchlistedCoins}
          />
        }
      />
      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => clearWatchlist()}
      >
        <View style={styles.deleteItem}>
          <Ionicons name="ios-basket-outline" size={30} color="grey" />
          <Text style={{ color: 'grey', fontSize: 12 }}>Clear all</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default WatchlistScreen;
