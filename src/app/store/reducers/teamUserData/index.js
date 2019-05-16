import { cloneObject } from 'js-simple-utils';

import initialState from './initialState';

export default function reducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_TEAM_USER_DATA':
      newState = cloneObject(state);
      newState = cloneObject(action.payload.data);
      return newState;

    default:
      return state;
  }
}
