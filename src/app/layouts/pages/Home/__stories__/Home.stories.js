import React from 'react';
import { storiesOf } from '@storybook/react';

import Home from '../Home';

const headerBarProps = {
  hideShadow: true,
};

storiesOf('Layouts|Home', module)
  .add('default', () => <Home headerBarProps={headerBarProps} />)
  .add('example loading', () => <Home headerBarProps={headerBarProps} isExampleLoading />);
