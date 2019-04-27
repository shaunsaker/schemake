import React from 'react';
import { storiesOf } from '@storybook/react';

import avatarMenuItems from '../avatarMenuItems';

import HeaderBar from '../HeaderBar';

const actions = [
  {
    iconName: 'add',
    tooltip: 'Add new collection',
  },
  {
    iconName: 'sort',
    tooltip: 'Sort mode (collapse collections)',
  },
  {
    iconName: 'share',
    tooltip: 'Share this project',
  },
  {
    iconName: 'account-circle',
    tooltip: 'Toggle the account menu',
    menu: {
      items: avatarMenuItems,
      isOpen: false,
    },
  },
];

storiesOf('Components|HeaderBar', module)
  .add('default', () => <HeaderBar text="PROJECT NAME" actions={actions} />)
  .add('with Logo only', () => <HeaderBar />)
  .add('with Actions only', () => <HeaderBar actions={actions} />)
  .add('with Text only', () => <HeaderBar text="PROJECT NAME" />);
