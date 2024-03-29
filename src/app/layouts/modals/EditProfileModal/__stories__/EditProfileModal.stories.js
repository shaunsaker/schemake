import React from 'react';
import { storiesOf } from '@storybook/react';

import EditProfileModal from '../EditProfileModal';

storiesOf('Modals|EditProfileModal', module)
  .add('default', () => <EditProfileModal isOpen />)
  .add('disabled', () => <EditProfileModal isOpen isDisabled />)
  .add('success', () => <EditProfileModal isOpen hasSuccess />);
