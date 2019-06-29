import React from 'react';
import { storiesOf } from '@storybook/react';

import DashboardListItem from '..';

const avatarText = 'SS';
const title = 'PROJECT NAME';
const description = 'Last updated by USERNAME on DATE (TIME ago)';
const menu = {
  items: [
    {
      name: 'Open project',
    },
  ],
};

storiesOf('Components|DashboardListItem', module)
  .add('default', () => (
    <DashboardListItem
      id="1"
      avatarText={avatarText}
      title={title}
      description={description}
      menu={menu}
    />
  ))
  .add('loading', () => <DashboardListItem />);
