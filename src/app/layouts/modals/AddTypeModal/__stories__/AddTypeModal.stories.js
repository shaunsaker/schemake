import React from 'react';
import { storiesOf } from '@storybook/react';

import AddTypeModal from '../AddTypeModal';

storiesOf('Modals|AddTypeModal', module)
  .add('default', () => <AddTypeModal isOpen type="Collection" />)
  .add('disabled', () => <AddTypeModal isOpen isDisabled type="Collection" />);
