import { combineReducers } from 'redux';

import appState from './appState';
import modals from './modals';
import projects from './projects';
import teams from './teams';
import teamUserData from './teamUserData';
import types from './types';
import user from './user';
import userData from './userData';

const appReducer = combineReducers({
  appState,
  modals,
  projects,
  teams,
  teamUserData,
  types,
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
