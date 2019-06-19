import React from 'react';
import { storiesOf } from '@storybook/react';

import SignUp from '../SignUp';

storiesOf('Layouts|SignUp', module)
  .add('default', () => <SignUp />)
  .add('disabled', () => <SignUp isDisabled />);
