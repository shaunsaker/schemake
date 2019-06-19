import React from 'react';
import { storiesOf } from '@storybook/react';

import Projects from '../Projects';

const items = [
  {
    avatarText: 'S',
    title: 'Schemake',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [
        { name: 'Open Project' },
        { name: 'Edit Project Details' },
        { name: 'Delete Project' },
      ],
    },
  },
  {
    avatarText: 'T',
    title: 'Testy',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [
        { name: 'Open Project' },
        { name: 'Edit Project Details' },
        { name: 'Delete Project' },
      ],
    },
  },
  {
    avatarText: 'C',
    title: 'Changey',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [
        { name: 'Open Project' },
        { name: 'Edit Project Details' },
        { name: 'Delete Project' },
      ],
    },
  },
];

storiesOf('Layouts|Projects', module)
  .add('default', () => <Projects items={items} handleProjectClick={console.log} />)
  .add('blank state', () => <Projects />);
