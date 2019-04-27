import React from 'react';
import { storiesOf } from '@storybook/react';

import Panel from '..';

const title = 'users';
const actions = [
  {
    iconName: 'add',
    tooltip: 'Add something',
  },
];
const children = <div style={{ width: '100%', height: 200, backgroundColor: 'lightgray' }} />;

storiesOf('Components|Panel', module)
  .add('default', () => (
    <Panel title={title} actions={actions}>
      {children}
    </Panel>
  ))
  .add('with BackgroundColor', () => (
    <Panel title={title} actions={actions} backgroundColor="red">
      {children}
    </Panel>
  ));
