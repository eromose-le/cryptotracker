import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import styles from './styles';
import { useTheme } from '../../Contexts/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';

const SwitchButton = () => {
  const dispatch = useDispatch();
  const { reduxThemeToggled } = useSelector((state) => state.themeReducer);

  const [toggle, setToggle] = useState(false);
  const { changeThemeData } = useTheme();

  // REDUX_THEME
  const changeThemeColor = () => {
    setToggle(!toggle);
    dispatch({
      type: 'TOGGLE_THEME',
      payload: reduxThemeToggled
    });

    return reduxThemeToggled ? changeThemeData(1) : changeThemeData(0);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#16c784' }}
        thumbColor={toggle ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={changeThemeColor}
        value={reduxThemeToggled}
      />
    </View>
  );
};

export default SwitchButton;
