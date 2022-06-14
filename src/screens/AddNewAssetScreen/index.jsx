import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { useRecoilState } from 'recoil';
import { allPortfolioBoughtAssetsInStorage } from '../../atoms/PortfolioAssets';
import { getAllCoins, getDetailedCoinData } from '../../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const AddNewAssetScreen = () => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={{
          ...styles.item,
          backgroundColor: reduxTheme.inputBackground
        }}
        itemTextStyle={{ color: reduxTheme.primary }}
        resetValue={false}
        placeholder={selectedCoinId || 'Select a coin...'}
        placeholderTextColor={reduxTheme.primary}
        textInputProps={{
          underlineColorAndroid: 'transparent',
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: '#444444',
            borderRadius: 5,
            backgroundColor: reduxTheme.inputBackground,
            color: 'white'
          }
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={{
                  color: reduxTheme.secondary,
                  fontSize: 90,
                  maxWidth: 280,
                  flexWrap: 'wrap'
                }}
                value={boughtAssetQuantity}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQuantity}
              />
              <Text style={{ ...styles.ticker, color: reduxTheme.primary }}>
                {selectedCoin.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={{ ...styles.pricePerCoin, color: reduxTheme.primary }}>
              ${selectedCoin.market_data.current_price.usd} per coin
            </Text>
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
    </KeyboardAvoidingView>
  );
};

export default AddNewAssetScreen;
