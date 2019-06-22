import { cloneObject } from 'js-simple-utils';

import initialState from './initialState';

export default function reducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_PROJECTS':
      newState = cloneObject(state);

      /*
       * Add new projects keyed by ids
       */
      action.payload.data.forEach((project) => {
        const { id } = project;

        newState[id] = project;
      });

      return newState;

    default:
      return state;
  }
}
