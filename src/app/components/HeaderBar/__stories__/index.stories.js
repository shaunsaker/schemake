import React from 'react';
import { storiesOf } from '@storybook/react';

import HeaderBar from '../HeaderBar';
import actions from '../../../layouts/pages/Editor/headerBarActions';

const newActions = [
  ...actions,
  {
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
  .add('default', () => <HeaderBar text="PROJECT NAME" actions={newActions} />)
  .add('with Logo only', () => <HeaderBar />)
  .add('with Actions only', () => <HeaderBar actions={actions} />)
  .add('with Text only', () => <HeaderBar text="PROJECT NAME" />);
