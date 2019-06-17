import React from 'react';
import { storiesOf } from '@storybook/react';

import Projects from '../Projects';

const items = [
  {
    avatarText: 'SS',
    title: 'Schemake',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Edit Project' }],
    },
  },
];

storiesOf('Layouts|Projects', module)
  .add('default', () => <Projects items={items} />)
  .add('blank state', () => <Projects />);
