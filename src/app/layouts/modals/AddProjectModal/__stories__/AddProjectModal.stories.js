import React from 'react';
import { storiesOf } from '@storybook/react';

import AddProjectModal from '../AddProjectModal';

const name = 'Schemake';

storiesOf('Modals|AddProjectModal', module)
  .add('default', () => <AddProjectModal isOpen name={name} />)
  .add('disabled', () => <AddProjectModal isOpen isDisabled name={name} />)
  .add('success', () => <AddProjectModal isOpen hasSuccess name={name} />);
