import { combineReducers } from 'redux';

import appState from './appState';
import modals from './modals';
import teams from './teams';
import teamUserData from './teamUserData';
import user from './user';
import userData from './userData';

const reducers = combineReducers({
  appState,
  modals,
  teams,
  teamUserData,
  user,
  userData,
});

export default reducers;
