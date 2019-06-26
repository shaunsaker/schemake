import React from 'react';
import { storiesOf } from '@storybook/react';

import Editor from '../Editor';
import headerBarActions from '../headerBarActions';

const headerBarProps = {
  text: 'SCHEMAKE',
  actions: headerBarActions,
};

storiesOf('Layouts|Editor', module)
  .add('default', () => (
    <Editor headerBarProps={headerBarProps} collections={[]} handleAddCollection={console.log} />
  ))
  .add('blank state', () => (
    <Editor headerBarProps={headerBarProps} collections={[]} handleAddCollection={console.log} />
  ));
