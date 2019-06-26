import React from 'react';
import { storiesOf } from '@storybook/react';

import Projects from '../Projects';

const selectProps = {
  selectedOptionIndex: 0,
  options: [
    {
      name: "Shaun's team",
    },
  ],
};

const items = [
  {
    avatarText: 'S',
    title: 'Schemake',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Edit Project Details' }, { name: 'Delete Project' }],
    },
  },
  {
    avatarText: 'T',
    title: 'Testy',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Edit Project Details' }, { name: 'Delete Project' }],
    },
  },
  {
    avatarText: 'C',
    title: 'Changey',
    description: 'Last updated by USERNAME on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Edit Project Details' }, { name: 'Delete Project' }],
    },
  },
];

storiesOf('Layouts|Projects', module)
  .add('default', () => (
    <Projects selectProps={selectProps} items={items} hasTeams handleProjectClick={console.log} />
  ))
  .add('blank state', () => <Projects />);
