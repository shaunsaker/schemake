import React from 'react';
import { storiesOf } from '@storybook/react';

import ActionFieldModal from '../ActionFieldModal';

storiesOf('Modals|ActionFieldModal', module)
  .add('default', () => <ActionFieldModal isOpen />)
  .add('disabled', () => <ActionFieldModal isOpen isDisabled />);
