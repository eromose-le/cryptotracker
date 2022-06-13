import { combineReducers } from 'redux';
import themeReducer from './themeReducer';

let reducers = combineReducers({
  themeReducer: themeReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
