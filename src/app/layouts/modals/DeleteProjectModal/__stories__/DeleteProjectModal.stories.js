import React from 'react';
import { storiesOf } from '@storybook/react';

import DeleteProjectModal from '../DeleteProjectModal';

const name = 'Schemake';

storiesOf('Modals|DeleteProjectModal', module)
  .add('default', () => <DeleteProjectModal isOpen name={name} />)
  .add('disabled', () => <DeleteProjectModal isOpen name={name} isDisabled />)
  .add('success', () => <DeleteProjectModal isOpen name={name} hasSuccess />);
