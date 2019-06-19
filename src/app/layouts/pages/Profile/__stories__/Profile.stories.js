import React from 'react';
import { storiesOf } from '@storybook/react';

import tabs from '../tabs';

import Profile from '../Profile';

const dateText = 'on X (TIME ago)';

storiesOf('Layouts|Profile', module)
  .add('default', () => <Profile dateText={dateText} currentTabIndex={0} tabs={tabs} />)
  .add('danger zone', () => <Profile dateText={dateText} currentTabIndex={1} tabs={tabs} />);
