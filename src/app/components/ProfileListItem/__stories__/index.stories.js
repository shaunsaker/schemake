import React from 'react';
import { storiesOf } from '@storybook/react';

import ProfileListItem from '..';

const label = 'NAME';
const value = 'Shaun Saker';

storiesOf('Components|ProfileListItem', module)
  .add('default', () => <ProfileListItem label={label} value={value} />)
  .add('with Bg', () => <ProfileListItem label={label} value={value} hasBg />);
