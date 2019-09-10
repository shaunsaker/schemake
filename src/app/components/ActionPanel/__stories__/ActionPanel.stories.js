import React from 'react';
import { storiesOf } from '@storybook/react';

import ActionPanel from '..';

const actions = [
  {
    id: 'account',
    iconName: 'account-circle',
    tooltip: 'Toggle Profile Menu',
  },
  {
    id: 'login',
    text: 'Login',
  },
];

storiesOf('Components|ActionPanel', module).add('default', () => <ActionPanel actions={actions} />);
