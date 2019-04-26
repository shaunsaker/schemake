import React from 'react';
import { storiesOf } from '@storybook/react';

import Headerbar from '..';

const avatar = { src: '/static/images/test-avatar.png', alt: 'Avatar', handleClick: null };

storiesOf('Components|Headerbar', module)
  .add('default', () => <Headerbar text="PROJECT NAME" avatar={avatar} />)
  .add('with Logo only', () => <Headerbar />)
  .add('with Avatar only', () => <Headerbar avatar={avatar} />)
  .add('with Text only', () => <Headerbar text="PROJECT NAME" />);
