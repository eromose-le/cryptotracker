import { StyleSheet, Text, View } from 'react-native';
import React, { useState, Suspense } from 'react';
import styles from './styles';
import { useSelector } from 'react-redux';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import {
  ProfileSelectionWithNav,
  ProfileSelectionWithSwitch
} from './ProfileSelection';
import {
  assets,
  COLORS,
  SIZES,
  FONTS,
  SHADOWS
} from '../../../assets/constants';

const ProfileScreen = ({ route }) => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);

  return (
    <>
      <ProfileHeader />
      <View style={{ position: 'relative' }}>
        {/* background */}
        <View
          style={{
            backgroundColor: reduxTheme.background,
            flex: 1,
            flexDirection: 'column',
            zIndex: 10,
            top: 0,
            left: 0,
            position: 'absolute',
            width: '100%',
            marginHorizontal: 'auto'
          }}
        >
          {/* Goto Toggle */}
          {/* <ProfileSelectionWithSwitch
            title={'Profile'}
            description={''}
            isDescription={false}
            isSwitch={false}
            isRedirect={true}
            uri={'Watchlist'}
          /> */}

          <View style={{ marginVertical: 10 }}>
            <ProfileSelectionWithNav
              title={'Aus TI NE'}
              isTab={false}
              isRedirect={false}
              uri={'Watchlist'}
            />
          </View>

          {/* Theme toggle */}
          <ProfileSelectionWithSwitch
            title={'Toggle Theme Mood'}
            description={'Choose between Dark and Light Mode'}
            isDescription={true}
            isSwitch={true}
            isRedirect={false}
            uri={''}
          />

          {/* activities */}
          <View style={{ marginVertical: 20 }}>
            <ProfileSelectionWithNav
              title={'My Watch Lists'}
              isTab={true}
              isRedirect={false}
              uri={'Watchlist'}
              imgSource={assets.heart}
            />

            <ProfileSelectionWithNav
              title={'Search NFTs, Tokens ..'}
              isTab={true}
              isRedirect={true}
              uri={'Portfolio'}
              imgSource={assets.search}
            />

            <ProfileSelectionWithNav
              title={'Account Verified'}
              isTab={false}
              isRedirect={false}
              uri={''}
              imgSource={assets.badge}
              textColor={'skyblue'}
            />
          </View>

          {/* quiklinks */}
          <View style={{ marginVertical: 20 }}>
            <ProfileSelectionWithNav
              title={'Restore default theme'}
              isTab={false}
              isRedirect={false}
              uri={'Watchlist'}
              textColor={'#16c784'}
            />
            <ProfileSelectionWithNav
              title={'Clear All WatchLists'}
              isTab={false}
              isRedirect={false}
              uri={'Watchlist'}
              textColor={'#ea3943'}
            />
            <ProfileSelectionWithNav
              title={'Delete Account'}
              isTab={false}
              isRedirect={false}
              uri={'Watchlist'}
              textColor={'#ea3943'}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
