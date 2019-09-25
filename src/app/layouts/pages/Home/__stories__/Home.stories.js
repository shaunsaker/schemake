import React from 'react';
import { storiesOf } from '@storybook/react';

import Home from '../Home';

const headerBarProps = {
  actions: [
    {
      id: 'example',
      text: 'Example',
      href: '',
    },
  ],
  hideShadow: true,
};

storiesOf('Layouts|Home', module).add('default', () => <Home headerBarProps={headerBarProps} />);
