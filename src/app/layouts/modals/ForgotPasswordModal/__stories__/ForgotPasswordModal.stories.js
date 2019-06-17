import React from 'react';
import { storiesOf } from '@storybook/react';

import ForgotPasswordModal from '../ForgotPasswordModal';

storiesOf('Modals|ForgotPasswordModal', module)
  .add('default', () => <ForgotPasswordModal isOpen />)
  .add('disabled', () => <ForgotPasswordModal isOpen isDisabled />)
  .add('success', () => <ForgotPasswordModal isOpen hasSuccess />);
