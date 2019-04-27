import React from 'react';
import { storiesOf } from '@storybook/react';

import TextAvatar from '..';

storiesOf('Components|TextAvatar', module)
  .add('default', () => <TextAvatar>SS</TextAvatar>)
  .add('small', () => <TextAvatar small>SS</TextAvatar>);
