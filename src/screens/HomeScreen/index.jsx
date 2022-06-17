import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinItem from '../../components/CoinItem';
import { getMarketData } from '../../services/requests';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import SwitchButton from '../../components/Button';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { reduxTheme } = useSelector((state) => state.themeReducer);
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
        {/* left */}
        <View>
          <Text
            style={{
              fontFamily: 'DroidSans',
              color: reduxTheme.primary,
              fontSize: 23,
              letterSpacing: 1,
              paddingHorizontal: 20,
              paddingBottom: 5
            }}
          >
            Cryptoassets List
          </Text>
          <Text
            style={{
              color: reduxTheme.tertiary,
              fontSize: 12,
              paddingHorizontal: 20,
              opacity: 0.3
            }}
          >
            Powered by CoinGecko
          </Text>
        </View>
        {/* profile */}
        <Pressable
          onPress={() => navigation.navigate('ProfileScreen')}
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: 20
          }}
        >
          <FontAwesome
            name="user-circle"
            size={30}
            color={reduxTheme.primary}
          />
        </Pressable>
      </View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={reduxTheme.primary}
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
