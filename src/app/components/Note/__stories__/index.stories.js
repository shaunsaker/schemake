import React from 'react';
import { storiesOf } from '@storybook/react';

import Note from '../Note';

storiesOf('Components|Note', module).add('default', () => (
  <Note
    avatarText="SS"
    username="Shaun Saker"
    dateText="Apr 3rd (9 hrs ago)"
    noteText="We should consider the implications on the prices collection"
  />
));
