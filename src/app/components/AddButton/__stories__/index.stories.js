import React from 'react';
import { storiesOf } from '@storybook/react';

import AddButton from '..';

storiesOf('Components|AddButton', module).add('default', () => (
  <AddButton handleClick={null}>ADD PROJECT</AddButton>
));
