import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';

const store = createStore(reducers);

const withStore = (story) => <Provider store={store}>{story()}</Provider>;

export default withStore;
