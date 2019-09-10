import React from 'react';
import { storiesOf } from '@storybook/react';

import ShareProjectModal from '../ShareProjectModal';

const name = 'Schemake';
const url = 'http://localhost:2412/editor?projectId=d054944e-73bf-4745-92ed-678fdfac3391';

storiesOf('Modals|ShareProjectModal', module).add('default', () => (
  <ShareProjectModal name={name} url={url} isOpen />
));
