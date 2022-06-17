import React, { useState } from 'react';
import { View, Switch, Text } from 'react-native';
import styles from './styles';
import { useTheme } from '../../Contexts/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';

const SwitchButton = ({ children }) => {
  const dispatch = useDispatch();
  const { reduxThemeToggled, reduxTheme } = useSelector(
    (state) => state.themeReducer
  );

  const [toggle, setToggle] = useState(reduxTheme.bool);
  const { changeThemeData } = useTheme();

  // REDUX_THEME
  const changeThemeColor = async (toggle) => {
    // console.log('start-toggle', toggle);
    // console.log('start-reduxThemeToggled', reduxThemeToggled);
    dispatch({
      type: 'TOGGLE_THEME',
      payload: false
    });
    setToggle(toggle);
    if (toggle) {
      changeThemeData(1);
      console.log('---1---');
    } else {
      changeThemeData(0);
      console.log('---0---');
    }

    console.log('end-toggle', toggle);
    console.log('end-reduxThemeToggled', reduxThemeToggled);
    return true;
  };

  // console.log('outside-toggle', toggle);
  console.log('outside-reduxThemeToggled', reduxThemeToggled);
  console.log('outside-reduxTheme', reduxTheme);

  return (
    <View style={styles.container}>
      <Switch
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        trackColor={{ false: '#767577', true: '#16c784' }}
        thumbColor={toggle ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => changeThemeColor(!toggle)}
        value={toggle}
      />
      {children}
    </View>
  );
};

export default SwitchButton;
