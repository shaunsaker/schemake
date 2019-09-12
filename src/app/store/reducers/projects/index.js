import { cloneObject } from 'js-simple-utils';

import initialState from './initialState';

export default function reducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_PROJECTS':
      newState = cloneObject(state);

      /*
       * Add items keyed by ids
       */
      action.payload.data.forEach((item) => {
        const { id } = item;

        newState[id] = item;
      });

      return newState;

    case 'SET_PROJECT_DATA':
      newState = cloneObject(state);
      newState[action.payload.projectId].data = action.payload.data;

      return newState;

    default:
      return state;
  }
}
