import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { useWatchlist } from '../../Contexts/WatchlistContext';
import { useTheme } from '../../Contexts/ThemeContext';
import CoinItem from '../../components/CoinItem';
import { getWatchlistedCoins } from '../../services/requests';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const WatchlistScreen = () => {
  const navigation = useNavigation();
  const { watchlistCoinIds, clearWatchlist } = useWatchlist();
  const { theme, changeThemeData } = useTheme();
  const [toggle, setToggle] = useState(false);

  const changeThemeColor = () => {
    setToggle(!toggle);
    return toggle ? changeThemeData(2) : changeThemeData(0);
  };

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

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]);

  if (transformCoinIds().length <= 0) {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>Watchlist empty..</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.button}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <>
      <Text
        style={{
          fontFamily: 'Capuche',
          color: 'white',
          fontSize: 23,
          letterSpacing: 1,
          paddingHorizontal: 20,
          paddingBottom: 5
        }}
      >
        Watchlist
      </Text>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={
              watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null
            }
          />
        }
      />
      <TouchableOpacity
        style={{ backgroundColor: theme.body, width: 200, height: 200 }}
        onPress={() => changeThemeColor()}
      >
        <Text style={{ color: '#fff' }}>Toggle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => clearWatchlist()}
      >
        <View style={styles.deleteItem}>
          <Ionicons name="ios-basket-outline" size={25} color="#4f4f4f" />
          <Text style={{ color: '#4f4f4f', fontSize: 8 }}>Clear all</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default WatchlistScreen;
