import React from 'react';
import { storiesOf } from '@storybook/react';

import AddButton from '..';

storiesOf('Components|AddButton', module).add('default', () => (
  <AddButton text="ADD PROJECT" handleClick={null} />
));
