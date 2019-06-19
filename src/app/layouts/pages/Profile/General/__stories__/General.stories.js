import React from 'react';
import { storiesOf } from '@storybook/react';

import General from '../General';

const name = 'Shaun Saker';
const organisation = 'Schemake';
const email = 'sakershaun@gmail.com';

storiesOf('Layouts|General', module).add('default', () => (
  <General name={name} organisation={organisation} email={email} />
));
