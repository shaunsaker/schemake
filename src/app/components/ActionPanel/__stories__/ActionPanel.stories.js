import React from 'react';
import { storiesOf } from '@storybook/react';

import ActionPanel from '..';

const actions = [
  {
    iconName: 'account-circle',
    tooltip: 'Toggle Profile Menu',
  },
  {
    text: 'Login',
  },
];

storiesOf('Components|ActionPanel', module).add('default', () => (
  <ActionPanel actions={actions} color="black" />
));
