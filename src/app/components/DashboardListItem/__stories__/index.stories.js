import React from 'react';
import { storiesOf } from '@storybook/react';

import DashboardListItem from '..';

const avatarText = 'SS';
const title = 'PROJECT NAME';
const description = 'Last updated by USERNAME on DATE (TIME ago)';

storiesOf('Components|DashboardListItem', module)
  .add('default', () => (
    <DashboardListItem avatarText={avatarText} title={title} description={description} />
  ))
  .add('loading', () => <DashboardListItem />);
