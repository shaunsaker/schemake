import React from 'react';
import { storiesOf } from '@storybook/react';

import RemoveTeamMemberModal from '../RemoveTeamMemberModal';

const name = 'Shaun Saker';

storiesOf('Modals|RemoveTeamMemberModal', module)
  .add('default', () => <RemoveTeamMemberModal isOpen name={name} />)
  .add('disabled', () => <RemoveTeamMemberModal isOpen isDisabled name={name} />)
  .add('success', () => <RemoveTeamMemberModal isOpen hasSuccess name={name} />);
