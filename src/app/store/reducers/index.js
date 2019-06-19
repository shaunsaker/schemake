import { combineReducers } from 'redux';

import appState from './appState';
import modals from './modals';
import teams from './teams';
import teamUserData from './teamUserData';
import user from './user';
import userData from './userData';

const appReducer = combineReducers({
  appState,
  modals,
  teams,
  teamUserData,
  user,
  userData,
});

const rootReducer = (state, action) => {
  let newState = state;

  if (action.type === 'PURGE_STORE') {
    newState = undefined;
  }

  return appReducer(newState, action);
};

export default rootReducer;
