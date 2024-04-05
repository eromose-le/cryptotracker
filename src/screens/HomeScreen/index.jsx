import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinItem from '../../components/CoinItem';
import { getMarketData } from '../../services/requests';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { assets } from '../../../assets/constants';
import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  let listViewRef;

  const upButtonHandler = () => {
    //onClick of Up button we scrolled the list to top
    listViewRef.scrollToOffset({ offset: 0, animated: true });
  };
  const downButtonHandler = () => {
    //onClick of down button we scrolled the list to bottom
    listViewRef.scrollToEnd({ animated: true });
  };

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    
    pageNumber >= 2 ? setShowArrow(true) : setShowArrow(false);
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
              fontFamily: 'Roboto_700Bold',
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
          {/* image */}
          {/* <Image
            source={assets.logo}
            resizeMode="cover"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              paddingHorizontal: 10,
              marginHorizontal: 5
            }}
          /> */}
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
        keyExtractor={({ id }, index) => `${id}${index}`}
        initialNumToRender={50}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={reduxTheme.primary}
            onRefresh={refetchCoins}
          />
        }
        ref={(ref) => {
          listViewRef = ref;
        }}
      />

      {/* down */}
      {!showArrow && <DownButton downButtonHandler={downButtonHandler} />}

      {/* up */}
      {showArrow && <UpButton upButtonHandler={upButtonHandler} />}
    </View>
  );
};

const DownButton = ({ downButtonHandler }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={downButtonHandler}
    style={styles.downButtonStyle}
  >
    <Image
      source={{
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_down.png'
      }}
      style={styles.downButtonImageStyle}
    />
  </TouchableOpacity>
);

const UpButton = ({ upButtonHandler }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={upButtonHandler}
    style={styles.upButtonStyle}
  >
    <Image
      source={{
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_up.png'
      }}
      style={styles.upButtonImageStyle}
    />
  </TouchableOpacity>
);

export default HomeScreen;
