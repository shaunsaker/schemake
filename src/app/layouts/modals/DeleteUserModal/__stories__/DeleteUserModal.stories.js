import React from 'react';
import { storiesOf } from '@storybook/react';

import DeleteUserModal from '../DeleteUserModal';

storiesOf('Layouts|DeleteUserModal', module)
  .add('default', () => <DeleteUserModal isOpen />)
  .add('disabled', () => <DeleteUserModal isOpen isDisabled />)
  .add('success', () => <DeleteUserModal isOpen hasSuccess />);
