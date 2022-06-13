import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinItem from '../../components/CoinItem';
import { getMarketData } from '../../services/requests';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontFamily: 'DroidSans',
            color: 'white',
            fontSize: 23,
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingBottom: 5
          }}
        >
          Cryptoassets List
        </Text>
        <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
          <Text
            style={{
              color: 'lightgrey',
              fontSize: 12,
              paddingHorizontal: 10,
              opacity: 0.1
            }}
          >
            Powered by CoinGecko
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
