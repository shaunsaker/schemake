import React from 'react';
import { storiesOf } from '@storybook/react';

import { colors } from '../../../static/styles/styleConstants';

import Panel from '..';

const title = 'users';
const actions = [
  {
    iconName: 'menu',
    tooltip: 'Toggle Menu',
  },
];
const children = <div style={{ width: '100%', height: 200 }} />;

storiesOf('Components|Panel', module)
  .add('default', () => (
    <Panel title={title} actions={actions}>
      {children}
    </Panel>
  ))
  .add('with BackgroundColor', () => (
    <Panel title={title} actions={actions} backgroundColor={colors.lightGrey}>
      {children}
    </Panel>
  ));
