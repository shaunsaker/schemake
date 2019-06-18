import { combineReducers } from 'redux';

import appState from './appState';
import teams from './teams';

const appReducer = combineReducers({
  appState,
  teams,
});

export default appReducer;
