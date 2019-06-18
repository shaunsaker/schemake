import React from 'react';
import { storiesOf } from '@storybook/react';

import Team from '../Team';

const selectProps = {
  selectedOptionIndex: 0,
  options: [
    {
      name: "Shaun's team",
    },
  ],
};

const teamMembers = [
  {
    avatarText: 'SS',
    title: 'Shaun Saker',
    description: 'Joined schemake on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Remove Shaun Saker' }],
    },
  },
  {
    avatarText: 'AS',
    title: 'Astrid Saker',
    description: 'Joined schemake on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Remove Astrid Saker' }],
    },
  },
  {
    avatarText: 'IS',
    title: 'Isla Saker',
    description: 'Joined schemake on DATE (TIME ago)',
    menu: {
      items: [{ name: 'Remove Isla Saker' }],
    },
  },
];

storiesOf('Layouts|Team', module)
  .add('default', () => <Team selectProps={selectProps} teamMembers={teamMembers} />)
  .add('blank state', () => <Team selectProps={selectProps} />);
