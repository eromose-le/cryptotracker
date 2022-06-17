import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useWatchlist } from '../../Contexts/WatchlistContext';
import CoinItem from '../../components/CoinItem';
import { getWatchlistedCoins } from '../../services/requests';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ModalComponent from '../../components/Modal';

const WatchlistScreen = () => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const navigation = useNavigation();
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

  const invokeClearWatchlist = () => {
    return clearWatchlist();
  };

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]);

  if (transformCoinIds().length <= 0) {
    return (
      <View style={styles.textContainer}>
        <Text style={{ ...styles.text, color: reduxTheme.secondary }}>
          Watchlist empty..
        </Text>
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
      {/* title */}
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
        Watchlist
      </Text>

      {/* list */}
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        ListFooterComponent={() => (
          <View
            style={{
              backgroundColor: reduxTheme.background,
              position: 'relative'
            }}
          >
            {coins.length > 9 && (
              <ModalComponent
                opacity={1}
                backgroundColor={reduxTheme.background}
                invokeClearWatchlist={invokeClearWatchlist}
              >
                <View style={styles.deleteItem}>
                  <Ionicons
                    name="ios-basket-outline"
                    size={25}
                    color="#4f4f4f"
                  />
                  <Text style={{ color: '#4f4f4f', fontSize: 8 }}>
                    Clear all
                  </Text>
                </View>
              </ModalComponent>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={reduxTheme.primary}
            onRefresh={
              watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null
            }
          />
        }
      />

      {/* clearWatchlist */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          width: '20%'
        }}
      >
        <ModalComponent invokeClearWatchlist={invokeClearWatchlist}>
          <View style={styles.deleteItem}>
            <Ionicons name="ios-basket-outline" size={25} color="#4f4f4f" />
            <Text style={{ color: '#4f4f4f', fontSize: 8 }}>Clear all</Text>
          </View>
        </ModalComponent>
      </View>
    </>
  );
};

export default WatchlistScreen;
