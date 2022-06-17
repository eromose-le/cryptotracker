import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { colorThemes } from '../../assets/constants';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { reduxThemeToggled, reduxTheme } = useSelector(
    (state) => state.themeReducer
  );
  const [selectTheme, setSelectTheme] = useState(0);
  const [theme, setTheme] = useState(colorThemes[selectTheme]);

  const getThemeData = async () => {
    try {
      // clearTheme();
      const jsonValue = await AsyncStorage.getItem('@theme_colors');
      dispatch({
        type: 'GET_THEME',
        payload: jsonValue != null ? JSON.parse(jsonValue) : reduxTheme
      });
    } catch (e) {
      console.log(e);
    }
  };

  const clearTheme = async () => {
    await AsyncStorage.removeItem('@theme_colors');
    dispatch({
      type: 'GET_THEME',
      payload: colorThemes[0]
    });
  };

  useEffect(() => {
    getThemeData();
  }, []);

  const changeThemeData = async (colorId) => {
    try {
      console.log('colorId', colorId);
      const newTheme = colorThemes[colorId];
      const jsonValue = JSON.stringify(newTheme);
      await AsyncStorage.setItem('@theme_colors', jsonValue).then(() =>
        dispatch({
          type: 'GET_THEME',
          payload: colorThemes[0]
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeThemeData
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
