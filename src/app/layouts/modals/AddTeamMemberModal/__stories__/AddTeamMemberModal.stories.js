import React from 'react';
import { storiesOf } from '@storybook/react';

import AddTeamMemberModal from '../AddTeamMemberModal';

const email = 'sakershaun@gmail.com';

storiesOf('Modals|AddTeamMemberModal', module)
  .add('default', () => <AddTeamMemberModal isOpen />)
  .add('disabled', () => <AddTeamMemberModal isOpen isDisabled />)
  .add('success', () => <AddTeamMemberModal isOpen hasSuccess email={email} />);
