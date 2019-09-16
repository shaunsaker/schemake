import React from 'react';
import { storiesOf } from '@storybook/react';

import DeleteTypeModal from '../DeleteTypeModal';

const type = 'collection';
const name = 'users';

storiesOf('Modals|DeleteTypeModal', module)
  .add('default', () => <DeleteTypeModal type={type} name={name} isOpen />)
  .add('disabled', () => <DeleteTypeModal type={type} name={name} isOpen isDisabled />);
