import React from 'react';
import { storiesOf } from '@storybook/react';

import Avatar from '..';

storiesOf('Components|Avatar', module).add('default', () => (
  <Avatar src="/static/images/test-avatar.png" alt="Avatar" />
));
