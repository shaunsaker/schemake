import { combineReducers } from 'redux';

import appState from './appState';
import modals from './modals';
import user from './user';
import userData from './userData';

const reducers = combineReducers({
  appState,
  modals,
  user,
  userData,
});

export default reducers;
