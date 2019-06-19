import React from 'react';
import { storiesOf } from '@storybook/react';

import DeleteProjectModal from '../DeleteProjectModal';

storiesOf('Modals|DeleteProjectModal', module)
  .add('default', () => <DeleteProjectModal isOpen />)
  .add('disabled', () => <DeleteProjectModal isOpen isDisabled />)
  .add('success', () => <DeleteProjectModal isOpen hasSuccess />);
