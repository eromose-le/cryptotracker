import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import PortfolioAssetsItem from '../PortfolioAssetItem';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage
} from '../../../../atoms/PortfolioAssets';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const PortfolioAssetsList = () => {
  const navigation = useNavigation();
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

  // Total Holding bal
  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );

    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };

  const isNaNConverter = (val) => {
    if (isNaN(val)) {
      return 0;
    }
    return val;
  };

  // deletFunc
  const onDeleteAsset = async (asset) => {
    // const newAssets = storageAssets.filter((coin) => coin.id !== asset.item.id);
    const newAssets = storageAssets.filter(
      (coin) => coin.unique_id !== asset.item.unique_id
    );

    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    setStorageAssets(newAssets);
  };

  // deleteBtn component
  const RenderDeleteButton = ({ data }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          backgroundColor: '#EA3943',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 30,
          marginLeft: 20
        }}
        onPress={() => onDeleteAsset(data)}
      >
        <FontAwesome name="trash-o" size={24} color="white" />
      </Pressable>
    );
  };

  const RenderUpdateButton = ({ data }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          backgroundColor: '#16c784',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 30,
          marginRight: 20
        }}
        onPress={() => console.log('updated!!')}
      >
        <MaterialIcons name="system-update-alt" size={24} color="white" />
      </Pressable>
    );
  };

  const renderButton = (data) => {
    return (
      <View
        style={{ flexDirection: 'row', backgroundColor: '#282828', flex: 1 }}
      >
        <RenderUpdateButton data={data} />
        <RenderDeleteButton data={data} />
      </View>
    );
  };

  const isChangePositive = () => getCurrentValueChange() >= 0;

  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioAssetsItem assetItem={item} />}
      rightOpenValue={-75}
      leftOpenValue={75}
      directionalDistanceChangeThreshold={10}
      stopRightSwipe={-175}
      stopLeftSwipe={175}
      // disableRightSwipe
      keyExtractor={({ id }, index) => `${id}${index}`}
      renderHiddenItem={(data) => renderButton(data)}
      ListHeaderComponent={
        <>
          <View
            style={{ ...styles.balanceContainer, color: reduxTheme.primary }}
          >
            <View>
              <Text
                style={{ ...styles.currentBalance, color: reduxTheme.primary }}
              >
                Current Balance
              </Text>
              <Text
                style={{
                  ...styles.currentBalanceValue,
                  color: reduxTheme.primary
                }}
              >
                ${getCurrentBalance().toFixed(2)}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: isChangePositive() ? 'green' : 'red'
                }}
              >
                ${getCurrentValueChange()} (All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangePercentageContainer,
                backgroundColor: isChangePositive() ? 'green' : 'red'
              }}
            >
              <AntDesign
                name={isChangePositive() ? 'caretup' : 'caretdown'}
                size={12}
                color={'white'}
                style={{ alignSelf: 'center', marginRight: 5 }}
              />
              <Text style={styles.percentageChange}>
                {isNaNConverter(getCurrentPercentageChange())}%
              </Text>
            </View>
          </View>
          <Text style={{ ...styles.assetsLabel, color: reduxTheme.primary }}>
            Your Assets
          </Text>
          <View
            style={{
              ...styles.headerLabelContainer,
              backgroundColor: reduxTheme.tableColor
            }}
          >
            <Text
              style={{
                color: reduxTheme.primary,
                fontSize: 13,
                fontWeight: 'bold',
                flex: 1.2,
                textAlign: 'center'
              }}
            >
              Name
            </Text>
            <Text
              style={{
                color: reduxTheme.primary,
                fontSize: 13,
                flex: 1,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Current Price
            </Text>
            <Text
              style={{
                color: reduxTheme.primary,
                fontSize: 13,
                flex: 1,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Wallet Balance
            </Text>
          </View>
        </>
      }
      ListFooterComponent={
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('AddNewAssetScreen')}
        >
          <Text style={styles.buttonText}>Add New Asset</Text>
        </Pressable>
      }
    />
  );
};

export default PortfolioAssetsList;
