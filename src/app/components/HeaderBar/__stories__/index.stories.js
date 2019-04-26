import React from 'react';
import { storiesOf } from '@storybook/react';

import Headerbar from '..';

const avatar = { text: 'SS', handleClick: null };

storiesOf('Components|Headerbar', module)
  .add('default', () => <Headerbar text="PROJECT NAME" avatar={avatar} />)
  .add('with Logo only', () => <Headerbar />)
  .add('with Avatar only', () => <Headerbar avatar={avatar} />)
  .add('with Text only', () => <Headerbar text="PROJECT NAME" />);
