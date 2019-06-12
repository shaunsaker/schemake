import { cloneObject } from 'js-simple-utils';

import initialState from './initialState';

export default function reducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_TEAM_USER_DATA':
      newState = cloneObject(state);

      /*
       * Set the user's data keyed by their uid
       */
      const { id } = action.payload.data; // eslint-disable-line

      newState[id] = cloneObject(action.payload.data);

      return newState;

    default:
      return state;
  }
}
