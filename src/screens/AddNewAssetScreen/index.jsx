import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

import { useRecoilState } from 'recoil';
import { allPortfolioBoughtAssetsInStorage } from '../../atoms/PortfolioAssets';
import { getAllCoins, getDetailedCoinData } from '../../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

  const navigation = useNavigation();

  const isQuantityEntered = () => boughtAssetQuantity === '';

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailedCoinData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  // GET GENERAL LIST OF COINS
  useEffect(() => {
    fetchAllCoins();
  }, []);

  // GET COIN DETAIL
  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  // ADD TO ASSET
  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      // unique_id: selectedCoin.id + Math.random(0, 1e6),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd
    };
    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    // set loacalStorage
    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    // set recoil
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };

  // DESTRUCTURE
  // const {
  //   symbol,
  //   market_data: { current_price }
  // } = selectedCoin;

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: 'white' }}
        resetValue={false}
        placeholder={selectedCoinId || 'Select a coin...'}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: 'transparent',
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: '#444444',
            borderRadius: 5,
            backgroundColor: '#1e1e1e',
            color: 'white'
          }
        }}
      />
      {selectedCoin && (
        <>
          <View
            style={{
              ...styles.boughtQuantityContainer,
              flex: boughtAssetQuantity ? 0 : 1
            }}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={{
                width: '100%'
              }}
              contentContainerStyle={{
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{
                    color: 'white',
                    fontSize: 90,
                    maxWidth: 280,
                    flexWrap: 'wrap'
                  }}
                  value={boughtAssetQuantity}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={setBoughtAssetQuantity}
                />
                <Text style={styles.ticker}>
                  {selectedCoin?.symbol.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.pricePerCoin}>
                ${selectedCoin?.market_data?.current_price?.usd} per coin
              </Text>
              {/* <Feather
                name="chevrons-down"
                size={20}
                color="grey"
                style={{ marginTop: 10 }}
              /> */}
            </ScrollView>
          </View>
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: isQuantityEntered() ? '#303030' : '#4169E1'
            }}
            onPress={onAddNewAsset}
            disabled={isQuantityEntered()}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntered() ? 'grey' : 'white'
              }}
            >
              Add New Asset
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddNewAssetScreen;
