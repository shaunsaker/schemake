import { cloneObject } from 'js-simple-utils';

import initialState from './initialState';

export default function modalReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'TOGGLE_MODAL':
      newState = cloneObject(state);
      newState.isOpen = !newState.isOpen;
      newState.key = action.payload && action.payload.key;
      newState.props = action.payload && action.payload.props;
      return newState;

    default:
      return state;
  }
}
