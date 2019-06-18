import React from 'react';
import { storiesOf } from '@storybook/react';

import Dashboard from '../Dashboard';
import tabs from '../tabs';

storiesOf('Layouts|Dashboard', module)
  .add('default', () => <Dashboard currentTabIndex={0} tabs={tabs} />)
  .add('team', () => <Dashboard currentTabIndex={1} tabs={tabs} />);
