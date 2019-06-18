import React from 'react';
import { storiesOf } from '@storybook/react';

import Projects from '../Projects';

const items = [
  {
    avatarText: 'S',
    title: 'Schemake',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Edit Project' }],
    },
  },
  {
    avatarText: 'T',
    title: 'Testy',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Edit Project' }],
    },
  },
  {
    avatarText: 'C',
    title: 'Changey',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Edit Project' }],
    },
  },
];

storiesOf('Layouts|Projects', module)
  .add('default', () => <Projects items={items} />)
  .add('blank state', () => <Projects />);
