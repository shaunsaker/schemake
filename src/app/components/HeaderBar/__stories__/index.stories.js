import React from 'react';
import { storiesOf } from '@storybook/react';

import HeaderBar from '../HeaderBar';

const avatar = {
  text: 'SS',
  handleClick: null,
};

storiesOf('Components|HeaderBar', module)
  .add('default', () => <HeaderBar text="PROJECT NAME" avatar={avatar} />)
  .add('with Logo only', () => <HeaderBar />)
  .add('with Avatar only', () => <HeaderBar avatar={avatar} />)
  .add('with Text only', () => <HeaderBar text="PROJECT NAME" />);
