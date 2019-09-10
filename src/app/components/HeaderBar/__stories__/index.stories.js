import React from 'react';
import { storiesOf } from '@storybook/react';

import HeaderBar from '../HeaderBar';

const actions = [
  {
    id: 'share',
    iconName: 'share',
    tooltip: 'Share this project',
  },
  {
    id: 'account',
    iconName: 'account-circle',
    tooltip: 'Toggle the account menu',
    color: 'white',
    menu: {
      items: [
        {
          name: 'Edit Profile',
          handleClick: () => {},
        },
        {
          name: 'Logout',
          handleClick: () => {},
        },
      ],
      isOpen: false,
    },
  },
];

storiesOf('Components|HeaderBar', module)
  .add('default', () => <HeaderBar text="PROJECT NAME" actions={actions} />)
  .add('with Logo only', () => <HeaderBar />)
  .add('with Actions only', () => <HeaderBar actions={actions} />)
  .add('with Text only', () => <HeaderBar text="PROJECT NAME" />);
