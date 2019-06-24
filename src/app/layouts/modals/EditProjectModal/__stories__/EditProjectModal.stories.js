import React from 'react';
import { storiesOf } from '@storybook/react';

import EditProjectModal from '../EditProjectModal';

storiesOf('Modals|EditProjectModal', module)
  .add('default', () => <EditProjectModal isOpen />)
  .add('disabled', () => <EditProjectModal isOpen isDisabled />)
  .add('success', () => <EditProjectModal isOpen hasSuccess />);
