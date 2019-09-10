import React from 'react';
import { storiesOf } from '@storybook/react';

import ActionTypeModal from '../ActionTypeModal';

storiesOf('Modals|ActionTypeModal', module)
  .add('default', () => <ActionTypeModal isOpen type="Collection" />)
  .add('disabled', () => <ActionTypeModal isOpen isDisabled type="Collection" />);
