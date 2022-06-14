import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colorThemes from '../constants/colorThemes';
import { useSelector, useDispatch } from 'react-redux';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { reduxThemeToggled } = useSelector((state) => state.themeReducer);
  const [selectTheme, setSelectTheme] = useState(0);
  const [theme, setTheme] = useState(colorThemes[selectTheme]);

  const getThemeData = async () => {
    try {
      // clearTheme();
      const jsonValue = await AsyncStorage.getItem('@theme_colors');
      setTheme(jsonValue != null ? JSON.parse(jsonValue) : theme);
      dispatch({
        type: 'GET_THEME',
        payload: jsonValue != null ? JSON.parse(jsonValue) : theme
      });
    } catch (e) {
      console.log(e);
    }
  };

  const clearTheme = async () => {
    await AsyncStorage.removeItem('@theme_colors');
    setTheme(colorThemes[selectTheme]);
  };

  useEffect(() => {
    getThemeData();
  }, [reduxThemeToggled]);

  const changeThemeData = async (colorId) => {
    try {
      setSelectTheme(colorId);
      const newTheme = colorThemes[selectTheme];
      const jsonValue = JSON.stringify(newTheme);
      await AsyncStorage.setItem('@theme_colors', jsonValue);
      // UPDATE STATE
      setTheme(colorThemes[selectTheme]);
      // UPDATE REDUX
      dispatch({
        type: 'GET_THEME',
        payload: colorThemes[selectTheme]
      });
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
