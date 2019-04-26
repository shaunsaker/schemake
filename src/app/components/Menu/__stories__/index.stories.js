import React from 'react';
import { storiesOf } from '@storybook/react';

import Menu from '..';

const items = [{ name: 'Profile' }, { name: 'Sign Out' }];

storiesOf('Components|Menu', module).add('default', () => (
  <Menu items={items} isOpen handleClick={null} handleClose={null} />
));
