import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SwitchButton from '../../../components/Button';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileSelection = (props) => {
  return (
    <View>
      <ProfileSelectionWithSwitch data={props} />
      <ProfileSelectionWithNav data={props} />
    </View>
    // props.data
  );
};

/**
 * 
 * @param {*} props 
 * @param 
 * 
 * `
    title = '',
    description = '',
    isDescription = true,
    isSwitch = true,
    isRedirect = true,
    uri = ''
  `
 * @returns a component with toggle switch, navigation, descripton and title
 */
const ProfileSelectionWithSwitch = (props) => {
  const navigation = useNavigation();
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  let {
    title = '',
    description = '',
    isDescription = true,
    isSwitch = true,
    isRedirect = true,
    uri = ''
  } = props;
  return (
    <View
      style={{
        marginVertical: 15,
        backgroundColor: reduxTheme.body
      }}
    >
      {/* selection container */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 2
        }}
      >
        {/* title text || link */}
        {isRedirect ? (
          <Pressable onPress={() => navigation.navigate(uri)}>
            <Text
              style={{
                color: '#008cff',
                fontWeight: 'bold',
                fontSize: 15,
                paddingVertical: 10
              }}
            >
              {title}
            </Text>
          </Pressable>
        ) : (
          <Text
            style={{
              color: reduxTheme.primary,
              fontSize: 15,
              paddingVertical: 10
            }}
          >
            {title}
          </Text>
        )}

        {/* switch */}
        {isSwitch && <SwitchButton />}
      </View>

      {/* desc */}
      {isDescription && (
        <Text
          style={{
            color: reduxTheme.tertiary,
            backgroundColor: reduxTheme.background,
            fontSize: 12,
            paddingHorizontal: 20,
            paddingVertical: 2
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
};

/**
 *
 * @param {*} props
 * @param
 * 
 *  `
    title = '',
    isRedirect = true,
    uri = '',
    isTab = true,
    imgSource,
    textColor = reduxTheme.primary
  `
 * 
 * @returns a component with direction arrow, navigation and title
 */
const ProfileSelectionWithNav = (props) => {
  const navigation = useNavigation();
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  let {
    title = '',
    isRedirect = true,
    uri = '',
    isTab = true,
    imgSource,
    textColor = reduxTheme.primary
  } = props;
  return (
    <>
      <Pressable
        style={{
          marginVertical: 0,
          backgroundColor: reduxTheme.body,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10
        }}
        onPress={() => isRedirect && navigation.navigate(uri)}
      >
        {/* icon */}
        {/* <View
        style={{
          borderRadius: 20,
          paddingRight: 8,
          marginHorizontal: 5
        }}
      >
        <MaterialCommunityIcons
          name="heart-box"
          size={26}
          color={reduxTheme.primary}
        />
      </View> */}

        {/* image */}
        {imgSource && (
          <Image
            source={imgSource}
            resizeMode="cover"
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              paddingHorizontal: 10,
              marginHorizontal: 5
            }}
          />
        )}

        {/* tab container */}
        <View
          style={{
            marginVertical: 1,
            backgroundColor: reduxTheme.body,
            borderWidth: 1,
            borderColor: reduxTheme.body,
            borderBottomColor: reduxTheme.lineColor,
            flex: 1
          }}
        >
          {/* selection container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 2
            }}
          >
            {/* <Pressable onPress={() => navigation.navigate(uri)}>
            <Text
              style={{
                color: '#008cff',
                fontWeight: 'bold',
                fontSize: 15,
                paddingVertical: 10
              }}
            >
              {title}
            </Text>
          </Pressable> */}

            <Text
              style={{
                color: reduxTheme.primary,
                fontSize: 15,
                paddingVertical: 10,
                color: textColor
              }}
            >
              {title}
            </Text>

            {/* redirect arrow */}
            {isTab && (
              <AntDesign name="right" size={12} color={reduxTheme.primary} />
            )}
          </View>
        </View>
      </Pressable>
    </>
  );
};

export {
  ProfileSelection,
  ProfileSelectionWithSwitch,
  ProfileSelectionWithNav
};
