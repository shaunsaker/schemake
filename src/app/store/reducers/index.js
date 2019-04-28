import { combineReducers } from 'redux';

import appState from './appState';
import modals from './modals';
import user from './user';

const reducers = combineReducers({
  appState,
  modals,
  user,
});

export default reducers;
