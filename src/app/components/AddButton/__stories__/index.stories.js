import React from 'react';
import { storiesOf } from '@storybook/react';

import AddButton from '..';

storiesOf('Components|AddButton', module)
  .add('default', () => <AddButton>ADD PROJECT</AddButton>)
  .add('primary', () => <AddButton primary>ADD PROJECT</AddButton>);
