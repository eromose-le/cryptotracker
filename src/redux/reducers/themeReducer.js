let defaultState = {
  reduxTheme: {
    name: 'light',
    mood: 'dark',
    primary: '#000',
    secondary: '#b9b9b9',
    tertiary: 'grey',
    lineColor: '#e9e9e9',
    tableColor: 'lightgrey',
    background: '#fff',
    tabBackground: '#fff',
    inputBackground: '#eeeeee',
    body: '#fff',
    gradientOpacity: 0,
    switchColor: '#eee',
    bool: true
  },
  reduxThemeToggled: false
};

let themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_THEME': {
      let newState = { ...state };
      // console.log('GET_THEME');
      console.log(action.payload.body);
      newState.reduxTheme = action.payload;
      console.log(newState.reduxTheme.name, '👉');
      return newState;
    }

    case 'TOGGLE_THEME': {
      let newState = { ...state };
      console.log('TOGGLE_THEME');
      newState.reduxThemeToggled = !action.payload;
      console.log(newState, '👉');
      return newState;
    }

    default:
      return state;
  }
};

export default themeReducer;
