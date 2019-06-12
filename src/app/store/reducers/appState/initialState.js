const initialState = {
  pendingTransactions: [],
  syncedTransactions: [],
  systemMessage: {
    message: null,
    variant: null,
  },
  isLoading: null,
  isSaving: null,
  isSyncing: null,
  selectedTeamIndex: 0,
};

export default initialState;
