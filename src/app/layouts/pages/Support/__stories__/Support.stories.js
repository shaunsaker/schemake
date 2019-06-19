import React from 'react';
import { storiesOf } from '@storybook/react';

import Support from '../Support';

storiesOf('Layouts|Support', module)
  .add('default', () => <Support />)
  .add('disabled', () => <Support isDisabled />)
  .add('success', () => <Support hasSuccess />);
