import React from 'react';
import { storiesOf } from '@storybook/react';

import { colors } from '../../../static/styles/styleConstants';

import Panel from '..';
import AddButton from '../../AddButton';

const actions = [
  {
    iconName: 'menu',
    tooltip: 'Toggle Menu',
  },
];

storiesOf('Components|Panel', module)
  .add('default', () => (
    <Panel title="users" actions={actions}>
      <AddButton>Add Document</AddButton>
    </Panel>
  ))
  .add('blank collection', () => (
    <Panel title="users" actions={actions} isExpanded>
      <AddButton>Add Document</AddButton>
    </Panel>
  ))
  .add('with blank document', () => (
    <Panel title="users" actions={actions} isExpanded>
      <Panel title="uid" actions={actions} isExpanded backgroundColor={colors.lightGrey}>
        <AddButton>Add Field</AddButton>
      </Panel>
    </Panel>
  ))
  .add('with fields', () => (
    <Panel title="users" actions={actions} isExpanded>
      <Panel title="uid" actions={actions} isExpanded backgroundColor={colors.lightGrey}>
        <Panel title="name" actions={actions} />

        <Panel title="email" actions={actions} />

        <Panel title="organisation" actions={actions} />

        <Panel title="friends" actions={actions} isExpanded>
          <Panel title="uid" actions={actions} backgroundColor={colors.lightGrey} />
        </Panel>
      </Panel>
    </Panel>
  ));
