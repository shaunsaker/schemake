import { cloneObject } from 'js-simple-utils';

import initialState from './initialState';

export default function reducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_SYSTEM_MESSAGE':
      newState = cloneObject(state);
      newState.systemMessage = action.payload.systemMessage;
      return newState;

    case 'RESET_SYSTEM_MESSAGE':
      newState = cloneObject(state);
      newState.systemMessage = initialState.systemMessage;
      return newState;

    case 'ADD_PENDING_TRANSACTION':
      newState = cloneObject(state);
      newState.pendingTransactions.push(action.payload.event);
      return newState;

    case 'REMOVE_PENDING_TRANSACTION':
      newState = cloneObject(state);
      newState.pendingTransactions = newState.pendingTransactions.filter((event) => {
        return event.id !== action.payload.eventId;
      });
      return newState;

    case 'RESET_PENDING_TRANSACTIONS':
      newState = cloneObject(state);
      newState.pendingTransactions = initialState.pendingTransactions;
      return newState;

    case 'SET_IS_LOADING':
      newState = cloneObject(state);
      newState.isLoading = action.payload.isLoading;
      return newState;

    case 'SET_SELECTED_TEAM_INDEX':
      newState = cloneObject(state);
      newState.selectedTeamIndex = action.payload.selectedTeamIndex;
      return newState;

    default:
      return state;
  }
}
