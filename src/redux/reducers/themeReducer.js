let defaultState = {
  reduxTheme: {},
  reduxThemeToggled: false
};

let themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_THEME': {
      let newState = { ...state };
      console.log('GET_THEME');
      newState.reduxTheme = action.payload;
      console.log(newState, '👉');
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
