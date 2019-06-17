import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line

import ActionProjectModal from '../ActionProjectModal';

storiesOf('Modals|ActionProjectModal', module)
  .add('default', () => <ActionProjectModal isOpen />)
  .add('editing', () => <ActionProjectModal isOpen isEditing />)
  .add('disabled', () => <ActionProjectModal isOpen isDisabled />);
