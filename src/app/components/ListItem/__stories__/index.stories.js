import React from 'react';
import { storiesOf } from '@storybook/react';

import ListItem from '..';

const avatarText = 'SS';
const title = 'PROJECT NAME';
const description = 'Last updated by USERNAME on DATE (TIME ago)';

storiesOf('Components|ListItem', module).add('default', () => (
  <ListItem
    avatarText={avatarText}
    title={title}
    description={description}
    handleMenuIconClick={null}
  />
));
