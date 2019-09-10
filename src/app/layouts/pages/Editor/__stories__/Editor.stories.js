import React from 'react';
import { storiesOf } from '@storybook/react';

import Editor from '../Editor';
import items from '../../../../components/Panels/__stories__/items';

const headerBarProps = {
  text: 'PROJECT TITLE',
  actions: [
    {
      iconName: 'share',
      tooltip: 'Share this project',
    },
  ],
};

storiesOf('Layouts|Editor', module)
  .add('default', () => (
    <Editor
      headerBarProps={headerBarProps}
      items={items}
      handleAddItem={console.log}
      handleEditItem={console.log}
      handleDeleteItem={console.log}
    />
  ))
  .add('blank state', () => (
    <Editor
      headerBarProps={headerBarProps}
      items={[]}
      handleAddItem={console.log}
      handleEditItem={console.log}
      handleDeleteItem={console.log}
    />
  ));
